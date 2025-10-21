const router = require("express").Router();

const DocumentosFaltantesController = require('../../controllers/DocumentosFaltantesController');
const { checkRolAdmin } = require("../../middlewares/checkRol");

router.post('/', checkRolAdmin, DocumentosFaltantesController.create)

router.get('/:id', DocumentosFaltantesController.getByIdEmp)

router.post('/delete-doc', checkRolAdmin, DocumentosFaltantesController.deleteDoc)

module.exports = router