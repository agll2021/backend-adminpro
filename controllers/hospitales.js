const Hospital = require('../models/hospital');
const { response } = require('express');
const bcrypt = require('bcryptjs');
//  const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response)=> {


    const hospitales = await Hospital.find({}, 'nombre img usuario')
                                     .populate('usuario','nombre img');

    res.json(
        { 
            "codigo" : "0000",
            hospitales
        }
    );

};

const crearHospitales = async(req, res = response)=> {

    //Realizar validaciones de los campos enviados:
    try {
        
     

        // Crear una instancia del modelo
        
        // const hospital = new Hospital(req.body);

        // destructurar
        const uid = req.uid;
        const hospital = new Hospital(
            {
                usuario: uid,
                ...req.body
            });
               
        const hospitalDB = await hospital.save();

        res.json(
            { 
                "codigo" : "0000",
                "mensaje" : "Creacion exitosa.",
                "hospital" : hospitalDB
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al registrar el hospital ... revisar el logs"
            }
        );
    }


};


const actualizarHospitales = async(req, res = response)=> {

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
                "mensaje": "Hospital actualizado",
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

const borrarHospitales = async (req, res= response)=>{

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
                "mensaje" : "Hospital eliminado de la BD" 
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
    getHospitales, 
    crearHospitales, 
    actualizarHospitales, 
    borrarHospitales
};