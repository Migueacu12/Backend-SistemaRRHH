const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// rutas CRUD básicas
router.get('/usuarios', userController.getUsuarios);
router.get('/usuarios/:id', userController.getUsuarioById);
router.post('/usuarios', userController.createUsuario);
router.put('/usuarios/:id', userController.updateUsuario);
router.delete('/usuarios/:id', userController.deleteUsuario);

module.exports = router;