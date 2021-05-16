/*
    ruta: api/upload/
*/

const { Router } = require('express');
const { fileUpload, obtenerArchivo } = require('../controllers/upload');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// configurando express File Upload
router.use(expressFileUpload());

router.put(
    '/:tabla/:id',
    validarJWT,
    fileUpload
);

router.get(
    '/:tabla/:foto',
    validarJWT,
    obtenerArchivo
);

module.exports = router;