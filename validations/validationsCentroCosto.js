const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateString, validateLength } = require('./validations')

const validationCentroCosto = [
    validateParam('nombre_centro_costo'),
    validateString('nombre_centro_costo'),
    validateLength('nombre_centro_costo', {min:3, max:20}),
    validateParam('id_ciudad_fk'),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationCentroCosto }