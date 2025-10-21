
const router = require("express").Router();

const { validationCentroCosto } = require('../../validations/validationsCentroCosto')

const CentroCostoController = require("../../controllers/CentroCostoController");
const { checkRolSoporte } = require("../../middlewares/checkRol");

router.get('/', CentroCostoController.getAll)

router.get('/table-data', checkRolSoporte, CentroCostoController.tableGetAll)

router.get('/:id', CentroCostoController.getOne)

router.post('/', checkRolSoporte, validationCentroCosto, CentroCostoController.create)

router.put('/:id', checkRolSoporte, validationCentroCosto, CentroCostoController.update)

router.delete('/:id', checkRolSoporte, CentroCostoController.delete) 

module.exports =  router