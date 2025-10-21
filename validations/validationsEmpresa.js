const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateString, validateLength, validateNumberNit } = require('./validations')

const validationEmpresa = [
    validateParam('nombre_empresa'),
    validateString('nombre_empresa'),
    validateLength('nombre_empresa', {min:4, max:50}),
    validateParam('nit'),
    validateLength('nit', {min:6, max:15}),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationEmpresa }