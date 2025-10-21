const req = require("express/lib/request")
const DocumentoModel = require("../Database/Model/DocumentoModel")
const EmpleadoModel = require("../Database/Model/EmpleadoModel")

const fs = require('fs').promises

const UploadFileControler = {

    uploadPerfilImage:async(req, res)=>{
        if(!req.file)
            res.json('Error al subir la imagen')
        else{
            EmpleadoModel.findByPk(req.idEmpleado,{attributes:['src_fotografia']}).then(data=>{
                EmpleadoModel.update({src_fotografia:req.file.filename}, {where:{id_empleado:req.idEmpleado}}) 
                if(data.src_fotografia!== req.file.filename){
                    fs.unlink(`./images/PerfilImages/${data.src_fotografia}`).then(()=>{
                        res.status(201).json('Actualizado con exito')
                    }).catch(()=>{
                        res.status(201).json('Guardado con exito')
                    })
                }
            })
        }
    },

    uploadFile:async(req,res)=>{
        const { tipo_documento_fk, nombre_documento } = req.body
        if(!req.file)
            res.json('Error al subir el archivo')
        else{
            DocumentoModel.create({
                nombre_documento,
                src_documento: req.file.filename,
                tipo_documento_fk,
                empleado_fk: req.idEmpleado
            }).then(()=>{
                res.json('Subido con exito')
            })
        }
    },

    getUploadFiles:async(_req,res)=>{
        const documentos = DocumentoModel.findAll({where:{empleado_fk:req.params.id}})
        res.json(documentos)
    }

}

module.exports = UploadFileControler