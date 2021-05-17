const Medico = require('../models/medico');
const { response } = require('express');


const getMedicos = async (req, res = response)=> {

    
    const medicos = await Medico.find({}, 'nombre img usuario hospital')
                                  .populate('usuario','nombre')
                                  .populate('hospital','nombre');

    res.json(
        { 
            "codigo" : "0000",
            medicos
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

    const id = req.params.id;
    const uuid = req.uid; 

     try {

        const medicoDB = await Medico.findById(id);

        if( !medicoDB){
            return res.status(400).json(
                {
                    "codigo" : "6000",
                    "mensaje" : "El medico no existe en la BD."
                }
            );
        }

        //Los campos actualizar excepto si se envia el campo contraseña y google en el cuerpo del json:
        //const campos = req.body;

        const camposActualizar = {
            ...req.body,
            usuario: uuid            
        }

        //Actualizacion en la BD:
        const medicoActualizado = await Medico.findByIdAndUpdate(id, camposActualizar, { new: true});

        res.json(
            {
                "codigo" : "0000",
                "mensaje": "Medico actualizado",
                medicoActualizado
            }
        );

        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al actualizar el medico... revisar el logs"
            }
        );
    }
};

const borrarMedicos = async (req, res= response)=>{

    try {

        const id = req.params.id;
        
        //validacion que el uid existe en la BD
        const medicoDB = await Medico.findById(id);

        if( !medicoDB){
            return res.status(400).json(
                {
                    "codigo" : "6000",
                    "mensaje" : "El Medico no existe en la BD."
                }
            );
        }

        await Medico.findByIdAndDelete(id);

        res.json(
            {
                "codigo":"0000",
                "mensaje" : "Medico eliminado de la BD" 
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                "codigo":"9000",
                "mensaje" : "Error inesperado al borrar el medico... revisar el logs"
            }
        );
    }
};


module.exports = { 
    getMedicos, 
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
};