const EmpresaModel = require('../Models/EmpresaModel')
const { validationResult } = require('express-validator')
const sequelize = require('../Database/configBD')

const EmpresaControler = {

    getAll:async(_req, res)=>{
        const empresas = await EmpresaModel.findAll()
        res.json(empresas)
    },

    getOne: async(req,res)=>{
        const empresa = await EmpresaModel.findByPk(req.params.id)
        res.json(empresa)
    },

    getTableData: async(req,res)=>{
        const empresas = await sequelize.query('select id_empresa,nombre_empresa,nit, COUNT(id_empleado)empleados from empresa left join empleado on empresa_fk = id_empresa group by id_empresa,nombre_empresa,nit')
        res.json(empresas[0])
    },

    create: async(req,res)=>{
        const {nombre_empresa, nit} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }
        await EmpresaModel.create({
            nombre_empresa: nombre_empresa,
            nit: nit
        }).then(()=>{
            res.status(201).json("Creado con exito")
        }).catch(()=>{
            res.json('Error al crear, puede haber una empresa con el mismo nombre')
        })
    },

    update: async(req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }

        const {nombre_empresa, nit} = req.body
        await EmpresaModel.update({
            nombre_empresa: nombre_empresa,
            nit:nit
        },{
            where:{ id_empresa:req.params.id}
        }).catch(()=>{
            res.json('Error al actualizar')
        })
        res.status(201).json("Actualizado con exito")
    },

    delete: async(req,res)=>{
        await EmpresaModel.destroy({
            where:{id_empresa:req.params.id}
        }).catch(err=>{
            res.json({err:"Error al borrar el producto"});
        });
        res.json("Borrado con exito")
    }

}

module.exports = EmpresaControler
