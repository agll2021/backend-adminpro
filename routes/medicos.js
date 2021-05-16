/*
    Rutas: /api/medicos
 */
/*
    Ruta:  /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get( 
    '/', 
    // validarJWT,
    getMedicos 
);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),        
        check('hospital','El id debe ser valido').isMongoId(), 
        validarCampos,
    ],
    crearMedicos
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
    actualizarMedicos 
);

router.delete('/:id', 
    // validarJWT,
    borrarMedicos);

module.exports = router;