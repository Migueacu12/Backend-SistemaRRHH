const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateString, validateLength } = require('./validations')

const validationDefault = [
    validateParam('nombre'),
    validateString('nombre'),
    validateLength('nombre', {min:2, max:35}),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationDefault }