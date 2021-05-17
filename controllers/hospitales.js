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

    const id = req.params.id;
    const uid = req.uid;
     try {

        const hospitalDB = await Hospital.findById(id);

        if( !hospitalDB){
            return res.status(400).json(
                {
                    "codigo" : "6000",
                    "mensaje" : "El hospital no existe en la BD."
                }
            );
        }

        //const { nombre } = req.body;

        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }

        //Actualizacion en la BD:
        //const hospitalActualizado = await Hospital.findByIdAndUpdate(uid, {nombre}, { new: true});
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true});

        res.json(
            {
                "codigo" : "0000",
                "mensaje": "Hospital actualizado",
                hospitalActualizado
            }
        );

        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al actualizar el hospital... revisar el logs"
            }
        );
    }
};

const borrarHospitales = async (req, res= response)=>{

    try {

        const id = req.params.id;
        
        //validacion que el uid existe en la BD
        const hospitalDB = await Hospital.findById(id);

        if( !hospitalDB){
            return res.status(400).json(
                {
                    "codigo" : "6000",
                    "mensaje" : "El hospital no existe en la BD."
                }
            );
        }

        await Hospital.findByIdAndDelete(id);

        res.json(
            {
                "codigo":"0000",
                "mensaje" : "Hospital eliminado de la BD" 
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al borrar el hospital... revisar el logs"
            }
        );
    }
};


module.exports = { 
    getHospitales, 
    crearHospitales, 
    actualizarHospitales, 
    borrarHospitales
};