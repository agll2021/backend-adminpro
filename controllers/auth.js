const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerifyToken } = require('../helpers/google-verify');

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

        res.status(200).json(
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

const googleSignIn = async(req, res = response)=>{


    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerifyToken(googleToken);

        // Valida existencia Usuario:
        const validarExisteUsuarioBD = await Usuario.findOne({email});
        let usuario;
        if(!validarExisteUsuarioBD){
            usuario = new Usuario({
                nombre: name,
                correo: email,                
                contrasena: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = validarExisteUsuarioBD;
            usuario.google = true;

        }

        // Guardar en la BD:
        await usuario.save();

        // Generar tokem
        const token = await generarJWT( usuario.id );


        res.status(200).json(
            {
                codigo : "0000",
                mensaje : " Login Google exitoso.",
                token
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                codigo : "9000",
                mensaje : " No es el token correcto de Google."                
            }
        );
    }

   
}



module.exports = {
    login,
    googleSignIn
 }