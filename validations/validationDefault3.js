const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateLength } = require('./validations')

const validationDefault3 = [
    validateParam('talla'),
    validateLength('talla', {min:1, max:10}),
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationDefault3 }