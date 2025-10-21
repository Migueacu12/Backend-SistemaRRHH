const { checkRolSoporte } = require("../../middlewares/checkRol");

const DefaultRouter = (modelo, id, nombre, name, fk_emp = name) =>{
    const router = require("express").Router();

    const { validationDefault } = require('../../validations/validationDefault')

    const DefaultController = require("../../controllers/DefaultController");

    const controller = DefaultController.defaultController(modelo, id, nombre, name, fk_emp)


    router.get('/', controller.getAll)

    router.get('/:id', controller.getOne)

    router.get('/default/table-data',  checkRolSoporte, controller.getTableData)

    router.post('/', checkRolSoporte,  validationDefault, controller.create)

    router.put('/:id',  checkRolSoporte, validationDefault, controller.update)

    router.delete('/:id',  checkRolSoporte, controller.delete)

    return router
}
module.exports = DefaultRouter