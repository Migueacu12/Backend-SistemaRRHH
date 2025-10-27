const CentroCostoModel = require('../Models/CentroCostoModel')
const CiudadModel = require('../Models/CiudadModel')
const { validationResult } = require('express-validator')
const EmpleadoModel = require('../Models/EmpleadoModel')
const { sequelize } = require('../Models/CentroCostoModel')

const CentroCostoControler = {

    getAll:async(_req, res)=>{
        const centrosCosto = await CentroCostoModel.findAll({
           
          attributes:['id_centro_costo' , 'nombre_centro_costo'] 
        })
        res.json(centrosCosto)
    },

    tableGetAll:async(_req,res)=>{
        const centrosCosto = await  sequelize.query('SELECT id_centro_costo, nombre_centro_costo, id_ciudad_fk, nombre_ciudad, COUNT(id_empleado)empleados FROM centro_costo LEFT JOIN ciudad AS ciudad ON id_ciudad_fk = id_ciudad LEFT JOIN empleado ON centro_costo_fk = id_centro_costo GROUP BY id_centro_costo, nombre_centro_costo, id_ciudad_fk, nombre_ciudad')
        res.json(centrosCosto[0])
    },

    getOne: async(req,res)=>{
        const centroCosto = await CentroCostoModel.findByPk(req.params.id,{
            include:{
                model:CiudadModel,
                attributes:['nombre_ciudad']
            },
            attributes:['id_centro_costo', 'nombre_centro_costo']
        })
        res.json(centroCosto)
    },

    create: async(req,res)=>{
        const {nombre_centro_costo, id_ciudad_fk} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }
        await CentroCostoModel.create({
            nombre_centro_costo: nombre_centro_costo,
            id_ciudad_fk
        }).then(()=>{
            res.status(201).json('Creado con exito')
        }).catch(()=>{
            res.json('Error al crear, puede que el nombre ya se esta usando en otro centro de costo')
        })
    },

    update: async(req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }

        const {nombre_centro_costo, id_ciudad_fk} = req.body
        await CentroCostoModel.update({
            nombre_centro_costo: nombre_centro_costo,
            id_ciudad_fk
        },{
            where:{ id_centro_costo:req.params.id}
        }).then(resp=>{
            res.status(201).json("Actualizado con exito")
        }).catch(err=>{
            res.json("Error al actualizar, puede que el nombre ya se esta usando en otro centro de costo")
        })
    },

    delete: async(req,res)=>{
        await CentroCostoModel.destroy({
            where:{id_centro_costo:req.params.id}
        }).catch(err=>{
            res.json({err:"Error al borrar el producto"});
        });
        res.json("Borrado con exito")
    }

}

module.exports = CentroCostoControler
