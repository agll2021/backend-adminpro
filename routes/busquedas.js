/*
    ruta: api/busqueda/:palabra_buscar
*/

const { Router } = require('express');
const { getBusquedaTotal, getBusquedaColeccionTabla } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get(
    '/:palabra',
    validarJWT,
    getBusquedaTotal
);

router.get(
    '/coleccion/:tabla/:busqueda',
    validarJWT,
    getBusquedaColeccionTabla
);
module.exports = router;