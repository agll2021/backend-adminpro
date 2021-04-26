/*
    Ruta:  /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios );

// Se usara middleware para validar los campos obligatorios mediante funciones
router.post(
            '/',
            [
                check('nombre','El nombre es obligatorio').not().isEmpty(),
                check('contrasena', 'El contrasena es obligatorio').not().isEmpty(),
                check('correo', 'El correo es obligatorio').isEmail(),
                validarCampos,
            ],
            crearUsuario 
);


router.put( 
        '/:id',
        [
            validarJWT,
            check('nombre','El nombre es obligatorio').not().isEmpty(),  
            check('role','El role es obligatorio').not().isEmpty(),            
            check('correo', 'El correo es obligatorio').isEmail(),
            validarCampos,
        ],
        actualizarUsuario 
);

router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;