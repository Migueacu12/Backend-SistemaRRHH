const DocumentosFaltantesModel = require('../Models/DocumentosFaltantesModel')
const sequelize = require('../Database/configBD')
const TipoDocumentoModel = require('../Models/TipoDocumentoModel')

const DocumentosFaltantesController = {

    create: async(req,res)=>{
        const {id_empleado_fk,id_tipo_documento_fk} = req.body
        await DocumentosFaltantesModel.create({id_empleado_fk,id_tipo_documento_fk}).then(()=>{
            res.status(201).json('Documento Faltante Agregado Con Éxito')
        }).catch(err=>{
            res.json('Este documento ya fue asignado')
        })
    },

    getByIdEmp: async(req,res)=>{
        const documentosFaltantes = await DocumentosFaltantesModel.findAll({
            where:{id_empleado_fk:req.params.id},
            include:[
                {model:TipoDocumentoModel,attributes:['nombre_tipo_documento']}
            ]
        })
        res.json(documentosFaltantes)
    },

    deleteDoc: async(req,res)=>{
        const {id_empleado_fk,id_tipo_documento_fk} = req.body
        await DocumentosFaltantesModel.destroy({where:{id_empleado_fk,id_tipo_documento_fk}}).then(()=>{
            res.json('Documento Borrado Con Exito')
        })
    }

}

module.exports = DocumentosFaltantesController
