const { checkRolSoporte } = require("../../middlewares/checkRol");

const DefaultRouter3 = (modelo, id, talla, name) =>{
    const router = require("express").Router();

    const { validationDefault3 } = require('../../validations/validationDefault3')

    const DefaultController3 = require("../../controllers/DefaultController3");

    const controller = DefaultController3.defaultController(modelo, id, talla, name)


    router.get('/', controller.getAll)

    router.get('/default/table-data', checkRolSoporte, controller.getTableData)

    router.get('/:id', controller.getOne)

    router.post('/', checkRolSoporte, validationDefault3, controller.create)

    router.put('/:id', checkRolSoporte, validationDefault3, controller.update)

    router.delete('/:id', checkRolSoporte, controller.delete)

    return router
}
module.exports = DefaultRouter3