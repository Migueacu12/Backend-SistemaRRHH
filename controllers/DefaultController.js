const defaultController=( model, id_def, nombre_def, name, fk_emp = name)=>{

    model = require(`../Database/Models/${model}`)
    const { validationResult } = require('express-validator')
    const sequelize = require('../Database/configBD')
    const Controller = {

        getAll:async(_req, res)=>{
            const items = await model.findAll()
            res.json(items)
        },

        getOne: async(req,res)=>{
            const item = await model.findByPk(req.params.id)
            res.json(item)
        },

        getTableData:async(req,res)=>{
            if(fk_emp==='ciudad'){
                let items = await sequelize.query(`select id_ciudad, nombre_ciudad, COUNT(id_empleado)empleados from ciudad LEFT JOIN empleado on lugar_nacimiento_fk = id_ciudad GROUP BY id_ciudad, nombre_ciudad`)
                let items2 = await sequelize.query(`select id_ciudad, COUNT(id_empleado)empleados from ciudad LEFT JOIN empleado on lugar_trabajo_fk = id_ciudad GROUP BY id_ciudad`)
                items2=items2[0]
                let items3 = await sequelize.query(`select id_ciudad, COUNT(id_empleado)empleados from ciudad LEFT JOIN empleado on lugar_exp_doc_fk = id_ciudad GROUP BY id_ciudad`)
                items3=items3[0]
                let items4 = await sequelize.query(`select id_ciudad, COUNT(id_centro_costo)centros_costo from ciudad LEFT JOIN centro_costo on id_ciudad_fk = id_ciudad GROUP BY id_ciudad`)
                items4=items4[0]

                let ciudades = []

                items[0].forEach((el, id) => {
                    let ciudad = {
                        id_ciudad:el.id_ciudad,
                        nombre_ciudad:el.nombre_ciudad,
                        empleados_lugar_nacimiento: el.empleados,
                        empleados_lugar_trabajo:items2[id].empleados,
                        empleados_lugar_exp_doc:items3[id].empleados,
                        lugar_centros_costo:items4[id].centros_costo
                    }
                    ciudades.push(ciudad)
                });

                res.json(ciudades)
                
            }else if(fk_emp==='tipo_documento'){
                const items = await sequelize.query(`select ${id_def},${nombre_def},COUNT(id_tipo_documento_fk)empleados from ${name} LEFT JOIN documentos_faltantes on id_tipo_documento_fk = id_tipo_documento group by ${id_def},${nombre_def}`)
                res.json(items[0])
            }else{
                const items = await sequelize.query(`select ${id_def}, ${nombre_def}, COUNT(id_empleado)empleados from ${name} LEFT JOIN empleado on ${fk_emp}_fk = ${id_def} GROUP BY ${id_def}, ${nombre_def}`)
                res.json(items[0])
            }

        },

        create: async(req,res)=>{
            const {nombre} = req.body
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({ errors:errors.array() })
            }
            await model.create({
                [nombre_def]: nombre
            }).then(()=>{
                res.status(201).json("Creado con exito")
            }).catch(()=>{
                res.json('Error al crear')
            })
        },

        update: async(req, res)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({ errors:errors.array() })
            }

            const {nombre} = req.body
            await model.update({
                [nombre_def]: nombre
            },{
                where:{ [id_def]:req.params.id}
            }).catch(()=>{
                res.json('Error al actualizar')
            })
            res.status(201).json("Actualizado con exito")
        },

        delete: async(req,res)=>{
            await model.destroy({
                where:{ [id_def]:req.params.id}
            }).catch(err=>{
                res.json({err:"Error al borrar el registro"});
            });
            res.json("Borrado con exito")
        }
    
    }
    return Controller 

    
}
module.exports = { defaultController }
