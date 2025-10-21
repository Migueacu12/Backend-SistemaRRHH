const { validateResult } = require('../helpers/validationHelper')

const { validateParam, validateNumber } = require('./validations')

const validationDefault2 = [
    validateParam('monto'),
    validateNumber('monto'), 
    (req,res,next)=>validateResult(req,res,next)
]

module.exports = { validationDefault2 }