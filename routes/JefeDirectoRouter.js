const router = require("express").Router();

const JefeDirectoController = require('../../controllers/JefeDirectoController');
const { checkRolSoporte } = require("../../middlewares/checkRol");

router.get('/', JefeDirectoController.getAll)

router.get('/table-data', checkRolSoporte, JefeDirectoController.getTableData)

router.get('/empleados', JefeDirectoController.getEmp)

router.post('/new-jefe', checkRolSoporte, JefeDirectoController.create)

router.post('/delete-jefe', checkRolSoporte, JefeDirectoController.delete)

module.exports = router