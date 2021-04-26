const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res)=> {


    const usuarios = await Usuario.find({}, 'nombre correo role img google');

    res.json(
        { 
            "codigo" : "0000",
            usuarios
        }
    );

};

const crearUsuario = async(req, res = response)=> {

    const { nombre,contrasena,correo } = req.body;

   

    //Realizar validaciones de los campos enviados:
    try {
        
        // valida que en la BD el correo sea unico con la propiedad findOnce, ya que en el esquema tiene el atributo unique.
        const existeCorreo = await Usuario.findOne({correo});

        if(existeCorreo){
            return res.status(400).json(
                {
                    "codigo" : "6000",
                    "mensaje" : "El correo existe."
                }
            );
        }

        // Crear una instancia del modelo
        const usuario = new Usuario(req.body);

        // Encriptando la contraseña con una sola via:
        const salt  = bcrypt.genSaltSync();
        usuario.contrasena = bcrypt.hashSync( contrasena, salt);

         // Grabar en la BD mongoose
        await usuario.save();

        // Generando token 
        const token = await generarJWT( usuario.id );

        res.json(
            { 
                "codigo" : "0000",
                "mensaje" : "Creacion exitosa.",
                usuario,
                token
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al registrar el usuario ... revisar el logs"
            }
        );
    }


};


const actualizarUsuario = async(req, res = response)=> {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB){
            return res.status(400).json(
                {
                    "codigo" : "6000",
                    "mensaje" : "El usuario no existe en la BD."
                }
            );
        }

        // Los campos actualizar excepto si se envia el campo contraseña y google en el cuerpo del json:
        //const campos = req.body;

        // Refactorizando/optimizando codigo:
        const { contrasena,google,role,correo, ...campos} = req.body;

        if( usuarioDB.correo !==  correo){
            
            const correoExiste = await Usuario.findOne({correo});
            if(correoExiste){
                return res.status(400).json({
                    "codigo" : "6000",
                    "mensaje" : "El correo existe en la BD."
                });
            }
        }
        
        // Campos que se eliminan en el cuerpo del JSON con delete:
        // delete campos.contrasena;
        // delete campos.google
        // delete campos.role
        
        campos.correo = correo;
        // Actualizacion en la BD:
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true});

        res.json(
            {
                "codigo" : "0000",
                "mensaje": "Usuario actualizado",
                usuarioActualizado
            }
        );

        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al actualizar el usuario... revisar el logs"
            }
        );
    }
};

const borrarUsuario = async (req, res= response)=>{

    try {

        const uid = req.params.id;
        
        // validacion que el uid existe en la BD
        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB){
            return res.status(400).json(
                {
                    "codigo" : "6000",
                    "mensaje" : "El usuario no existe en la BD."
                }
            );
        }

        await Usuario.findByIdAndDelete(uid);

        res.json(
            {
                "codigo":"0000",
                "mensaje" : "Usuario eliminado de la BD" 
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al borrar el usuario... revisar el logs"
            }
        );
    }
};


module.exports = { 
    getUsuarios, 
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
};