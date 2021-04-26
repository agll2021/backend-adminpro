const { response } = require('express');
const jwt  = require('jsonwebtoken');

const validarJWT = (req, res = response, next)=>{

    // Leer el token del header
    const token = req.header('x-token');
    
    if(!token){
        return res.status(400).json(
            {
                "codigo" : "9000",
                "mensaje" : "No tiene asignado un token en la peticion."
            }
        );
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_TOKEN);
        //console.log(uid);
        req.uid = uid;

        next();
        
    } catch (error) {
        return res.status(400).json(
            {
                "codigo" : "9000",
                "mensaje" : "Token invalido."
            }
        );
    }
    
}

module.exports = {
    validarJWT,
}