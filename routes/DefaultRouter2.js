const { checkRolSoporte } = require("../../middlewares/checkRol");
const { validationDefault2 } = require("../../validations/validationDefault2");

const DefaultRouter2 = (modelo, id, talla, name) =>{
    const router = require("express").Router();

    const DefaultController2 = require("../../controllers/DefaultController2");

    const controller = DefaultController2.defaultController(modelo, id, talla, name)


    router.get('/', controller.getAll)

    router.get('/:id', controller.getOne)

    router.get('/default/table-data', checkRolSoporte, controller.getTableData)

    router.post('/', checkRolSoporte, validationDefault2, controller.create)

    router.put('/:id', checkRolSoporte, validationDefault2, controller.update)

    router.delete('/:id', checkRolSoporte, controller.delete)

    return router
}
module.exports = DefaultRouter2