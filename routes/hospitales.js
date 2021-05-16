/*
    Ruta:  /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get( 
    '/', 
    // validarJWT,
    getHospitales 
);

router.post(
    '/',     
    [
        validarJWT,
        check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),                    
        validarCampos,
    ],
    crearHospitales
);

router.put( 
    '/:id',
    [
        // validarJWT,
        // check('nombre','El nombre es obligatorio').not().isEmpty(),
        // check('img', 'El contrasena es obligatorio').not().isEmpty(),
        // check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        // validarCampos,
    ],
    actualizarHospitales 
);

router.delete('/:id', 
    // validarJWT,
    borrarHospitales);

module.exports = router;