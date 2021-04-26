const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response)=>{


    const { correo, contrasena } = req.body;

    try {
        
        // validando que el correo exista
        const usuarioBD = await Usuario.findOne( { correo });
        
        if(!usuarioBD){
            return res.status(400).json(
                {
                    "codigo":"6000",
                    "mensaje" : "Error el correo no encontrado."
                }
            );
        }

        // validando contraseña
        const validarContrasena = bcrypt.compareSync(contrasena, usuarioBD.contrasena);

        if(!validarContrasena){
            return res.status(400).json(
                {
                    "codigo":"6000",
                    "mensaje" : "Error la contraseña no es valido."
                }
            );
        }

        // Generar tokem
        const token = await generarJWT( usuarioBD.id );

        res.json(
            {
                codigo : "0000",
                mensaje : " Login exitoso.",
                token
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al login del usuario ... revisar el logs"
            }
        );
    }
};





module.exports = {
    login,
 }