const Medico = require('../models/medico');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { ConnectionStates } = require('mongoose');
//  const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res = response)=> {

    
    const medicos = await Medico.find({}, 'nombre img usuario hospital')
                                  .populate('usuario','nombre')
                                  .populate('hospital','nombre');

    res.json(
        { 
            "codigo" : "0000",
            "medicos":  medicos
        }
    );

};

const crearMedicos = async(req, res = response)=> {

    //Realizar validaciones de los campos enviados:
    try {
        
        const uid = req.uid;                        

        const medico = new Medico(
            {
                usuario: uid,                
                ...req.body
            }
        );

        // Grabar en la BD mongoose
        const medicoBD = await medico.save();

        res.json(
            { 
                "codigo" : "0000",
                "mensaje" : "Creacion exitosa.",
                "medico" : medicoBD,
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al registrar el medico ... revisar el logs"
            }
        );
    }


};


const actualizarMedicos = async(req, res = response)=> {

    // const uid = req.params.id;

    //  try {

    //     const usuarioDB = await Usuario.findById(uid);

    //     if( !usuarioDB){
    //         return res.status(400).json(
    //             {
    //                 "codigo" : "6000",
    //                 "mensaje" : "El usuario no existe en la BD."
    //             }
    //         );
    //     }

        // Los campos actualizar excepto si se envia el campo contraseña y google en el cuerpo del json:
        //const campos = req.body;

        // Refactorizando/optimizando codigo:
        // const { contrasena,google,role,correo, ...campos} = req.body;

        // if( usuarioDB.correo !==  correo){
            
        //     const correoExiste = await Usuario.findOne({correo});
        //     if(correoExiste){
        //         return res.status(400).json({
        //             "codigo" : "6000",
        //             "mensaje" : "El correo existe en la BD."
        //         });
        //     }
        // }
        
        // Campos que se eliminan en el cuerpo del JSON con delete:
        // delete campos.contrasena;
        // delete campos.google
        // delete campos.role
        
        //campos.correo = correo;
        // Actualizacion en la BD:
        //const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true});

        res.json(
            {
                "codigo" : "0000",
                "mensaje": "Medico actualizado",
                //usuarioActualizado
            }
        );

        
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(
    //         {
    //             "codigo":"9000",
    //             "mensaje" : "Error inesperado al actualizar el hospital... revisar el logs"
    //         }
    //     );
    // }
};

const borrarMedicos = async (req, res= response)=>{

    // try {

        // const uid = req.params.id;
        
        // validacion que el uid existe en la BD
        // const usuarioDB = await Usuario.findById(uid);

        // if( !usuarioDB){
        //     return res.status(400).json(
        //         {
        //             "codigo" : "6000",
        //             "mensaje" : "El usuario no existe en la BD."
        //         }
        //     );
        // }

        // await Usuario.findByIdAndDelete(uid);

        res.json(
            {
                "codigo":"0000",
                "mensaje" : "Medico eliminado de la BD" 
            }
        );

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(
    //         {
    //             "codigo":"9000",
    //             "mensaje" : "Error inesperado al borrar el usuario... revisar el logs"
    //         }
    //     );
    // }
};


module.exports = { 
    getMedicos, 
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
};