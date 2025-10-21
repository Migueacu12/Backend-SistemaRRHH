const DocumentoModel = require("../Database/Model/DocumentoModel")

const fs = require('fs').promises

const DocumentosControler = {


    getUploadFiles:async(req,res)=>{
        const documentos = await DocumentoModel.findAll({where:{empleado_fk:req.params.id}})
        res.json(documentos)
    },

    deleteUploadFile: async(req,res)=>{
        const { src_documento, id_documento} = req.body

        fs.unlink(`./files/${src_documento}`).then(()=>{
            DocumentoModel.destroy({where:{id_documento}}).then(()=>{
                res.status(201).json('Borrado con exito')
            })
        }).catch(err=>{
            console.log(err)
            res.status(200).json('Error al borrar')
        })

    }

}

module.exports = DocumentosControler