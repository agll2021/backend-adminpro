/*
    Ruta:  /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth');

const router = Router();


router.post(
    '/',
    [
        check('correo','El correo es obligatorio').isEmail(),
        check('contrasena', 'El contrasena es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);


module.exports = router;