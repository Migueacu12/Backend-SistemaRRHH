
const router = require("express").Router();

const DocumentosController = require("../../controllers/DocumentosController");
const { checkRolSoporte } = require("../../middlewares/checkRol");

router.get('/docs-emp/:id', DocumentosController.getUploadFiles)

router.post('/delete-doc', DocumentosController.deleteUploadFile)


module.exports =  router