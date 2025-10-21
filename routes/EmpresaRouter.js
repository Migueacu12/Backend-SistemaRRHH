const router = require("express").Router();

const { validationEmpresa} = require('../../validations/validationsEmpresa')

const EmpresaController = require('../../controllers/EmpresaController');
const { checkRolSoporte } = require("../../middlewares/checkRol");

router.get('/', EmpresaController.getAll)

router.get('/table-data', checkRolSoporte, EmpresaController.getTableData)

router.get('/:id', EmpresaController.getOne)

router.post('/', checkRolSoporte, validationEmpresa, EmpresaController.create)

router.put('/:id', checkRolSoporte, validationEmpresa, EmpresaController.update)

router.delete('/:id', checkRolSoporte, EmpresaController.delete)


module.exports = router