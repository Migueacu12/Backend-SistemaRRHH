
const router = require("express").Router();

const EmpleadoController = require("../../controllers/EmpleadoController");
const { checkRolSoporte, checkRolAdmin } = require("../../middlewares/checkRol");

const { validationEmpleado } = require('../../validations/validationEmpleado')

router.get('/', checkRolAdmin, EmpleadoController.getAll)

router.get('/permisos', checkRolSoporte, EmpleadoController.getAllRoles)

router.put('/cambio-rol/:id', checkRolSoporte, EmpleadoController.changeRol)

router.get('/inactivos', checkRolAdmin, EmpleadoController.getAllInactives)

router.get('/nuevos-empleados', checkRolAdmin, EmpleadoController.listNuevosEmpleados)

router.get('/datos-cartas', checkRolAdmin, EmpleadoController.listDataCard)

router.get('/porcentaje-empleados', checkRolAdmin, EmpleadoController.dataEmpleadosEmpresa)

router.get('/tawkto-info', EmpleadoController.getTawktoInfo)

router.get('/:id', checkRolAdmin, EmpleadoController.getOne)

router.get('/info-perfil/:id', EmpleadoController.getInfoPerfil)

router.get('/default/certificado-lab', EmpleadoController.getInfoCertiLab)

router.get('/default/data-emp-docs/:id', EmpleadoController.getDataEmpDocs)

router.get('/default/obtener-img-perfil', EmpleadoController.getRouteImgPerfil)

router.put('/certificado-lab-new-date/:id', EmpleadoController.updateDateGenCerti)

router.post('/generar-reporte', checkRolAdmin, EmpleadoController.genReporte)

router.post('/', validationEmpleado, checkRolAdmin, EmpleadoController.create)

router.post('/cargue-masivo', checkRolAdmin, EmpleadoController.upsertArray)

router.put('/:id', validationEmpleado, checkRolAdmin, EmpleadoController.update)

router.put('/inactivar/:id', checkRolAdmin, EmpleadoController.disable) 

router.put('/activar/:id', checkRolAdmin, EmpleadoController.enable) 


module.exports = router
