const router = require("express").Router();

const checkLogin = require('../../middlewares/checkTokenLog')


const CredencialesController = require('../../controllers/CredencialController');
const { checkRolAdmin } = require("../../middlewares/checkRol");

router.post('/login', CredencialesController.login)

router.post('/chage-pass', checkLogin, CredencialesController.changePass)

router.get('/create-credentials', CredencialesController.createCredential)

router.get('/data-top-bar', checkLogin, CredencialesController.InfoTopBar)

router.post('/send-email-restore-pass', CredencialesController.emailRestorePass)

router.post('/restore-pass', checkLogin, checkRolAdmin, CredencialesController.restorePass)

module.exports =  router
