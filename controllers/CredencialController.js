const CredencialModel = require('../Models/CredencialModel')

require ('dotenv').config();

const EmpleadoModel = require('../Models/EmpleadoModel')

const TipoUsuarioModel = require('../Models/TipoUsuarioModel')

const { validationResult } = require('express-validator')

const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jwt-simple');
const res = require('express/lib/response');
const { enviarCorreo } = require('../helpers/sendEmailHelper');


const CredencialController = {

    //!TEMPORAL 
    createCredential:async(_req,res)=>{

        const empleados = await EmpleadoModel.findAll({attributes:['id_empleado', 'numero_identificacion'],order:['id_empleado']})
        empleados.forEach(async(el) => {
            let contra = bcrypt.hashSync(el.numero_identificacion, 10)
            await CredencialModel.create({
                nombre_usuario:el.numero_identificacion,
                contraseña: contra,
                usuario_fk: el.id_empleado
            }).catch(err=>{
                res.json({texto:'error al crear en:'+ el.id_empleado, err})
            })
            console.log('si en '+ el.id_empleado)
        });
    },

    login: async(req,res)=>{
        const {
            nombre_usuario,
            contraseña
        } = req.body

        const userValidation = await CredencialModel.findOne({where:{nombre_usuario}})
        
        if(userValidation){
            const passwordValidation = await bcrypt.compareSync(contraseña, userValidation.contraseña)
            if(passwordValidation){
                const empleado = await EmpleadoModel.findByPk(userValidation.usuario_fk, {attributes:['id_empleado','nombres', 'estado'], include:{model:TipoUsuarioModel, attributes:['nombre_tipo_usuario']}})
                if(empleado.estado){
                    res.status(201).json({tokenlog:createTokenLog(empleado), tipoUsuario:empleado.tipo_usuario.nombre_tipo_usuario})
                }else{
                    res.status(200).json('El usuario se encuentra inactivo')
                }
            }else{
                res.status(200).json('Error en usuario y/o contraseña')
            }
        }else{
            res.status(200).json('Error en usuario y/o contraseña')
        }

    },

    changePass: async(req,res)=>{
        let { oldPass, newPass} = req.body
        const userValidation = await CredencialModel.findOne({where:{usuario_fk:req.idEmpleado}})
        const passwordValidation = await bcrypt.compareSync(oldPass, userValidation.contraseña)
        if(passwordValidation){
            newPass = bcrypt.hashSync(newPass, 10)
            await CredencialModel.update({contraseña:newPass},{where:{usuario_fk:req.idEmpleado}}).then(()=>{
                res.status(201).json('Contraseña cambiada con exito')
            })
        }else{
            res.json('La contraseña anterior está mal')
        }

    },

    emailRestorePass: async(req,res)=>{
        const { numero_identificacion, nombre, centro_costo, cargo, tel_contacto, ciudad, mensaje} = req.body
        
        const contMail  = `
            Buen día,<br><br>
            El <b>SIGE<b> te informa que un usuario solicita restablecimiento de su contraseña<br><br>
            Doc: ${numero_identificacion}<br>
            Nombre: ${nombre}<br>
            Centro de costo: ${centro_costo}<br>
            Cargo: ${cargo}<br>
            Telefono Contacto: ${tel_contacto}<br>
            Ciudad: ${ciudad}<br>
            Mensaje adicional: ${mensaje?mensaje:'Sin Mensaje Adicional'}<br><br>
            Verifica que la información sea valida y realiza o no el restablecimiento de contraseña de usuario.
        `

        enviarCorreo('fscalderon93@misena.edu.co', 'Restablecimiento de contraseña // SIGE', contMail, res)
    },

    restorePass: async(req,res)=>{
        let { idUsuario } = req.body
        const dataUsuario = await EmpleadoModel.findByPk(idUsuario,{attributes:['id_empleado','numero_identificacion']})
        let pass = bcrypt.hashSync(dataUsuario.numero_identificacion,10)
        await CredencialModel.update({contraseña:pass},{where:{usuario_fk:dataUsuario.id_empleado}}).then(()=>{
            res.json('Se ha restablecido la contraseña')
        }).catch(err=>{
            res.json('Error al restablecer')
        })
    },

    InfoTopBar:(req,res)=>{
        let usuario = {
            nombre: req.nombreEmpleado,
            id: req.idEmpleado,
            Rol: req.tipoUsuario
        }
        res.json(usuario)
    }
    
}

const createTokenLog = (empleado) =>{
    const payload = {
        idEmpleado: empleado.id_empleado,
        nombreEmpleado: empleado.nombres,
        tipoUsuario: empleado.tipo_usuario.nombre_tipo_usuario,
        createAt: moment().unix(),
        expiredAt: moment().add(90,'minutes').unix()
    }        

    return jwt.encode(payload, process.env.PASSDECODE);
}


module.exports = CredencialController
