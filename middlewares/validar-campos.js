const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next)=>{

     // Validacion de errores del JSON con express-validator
     const errores = validationResult(req);
     if( !errores.isEmpty() ){
         return res.status(400).json(
             {
                 "codigo" : "6000",
                 "mensaje" : errores.mapped()
             }
         );
     }

     next();
};

module.exports = {
    validarCampos
}


