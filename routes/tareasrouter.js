const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.post('/', tareasController.crearTarea);
router.get('/', tareasController.listarTareas);
router.put('/:id', tareasController.editarTarea);
router.patch('/:id/estado', tareasController.cambiarEstado);
router.delete('/:id', tareasController.eliminarTarea);

module.exports = router;