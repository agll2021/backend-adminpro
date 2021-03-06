/*
    Ruta:  /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { login, googleSignIn, renovarToken } = require('../controllers/auth');

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

router.post(
    '/google',
    [        
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);

router.get(
    '/renovarToken',
    validarJWT,
    renovarToken
);

module.exports = router;