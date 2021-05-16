const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getBusquedaTotal = async (req, res = response)=>{

    try {

        const palabraBuscar = req.params.palabra;
        const regex = new RegExp(palabraBuscar, 'i');

        // const usuario = await Usuario.find({
        //     nombre: regex
        // });

        const [ usuario, medico, hospital] = await Promise.all([
            Usuario.find({
                nombre: regex
            }),
            Medico.find({
                nombre: regex
            }),
            Hospital.find({
                nombre: regex
            }),
            
        ]);


        res.status(200).json(
            {
                "codigo" : "0000",
                "buqueda": "Busqueda exitosa",
                usuario,
                medico,
                hospital
            }
        );
        
    } catch (error) {
        res.status(500).json(
            {
                "codigo": "9000",
                "mensaje": "Error inesperado al consultar la busqueda ... revisar el logs"
            }
        );
    }

};


const getBusquedaColeccionTabla = async (req, res = response)=>{

    try {

        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;
        const regex = new RegExp(busqueda, 'i');
        
        let data = [];

        switch (tabla) {
            case 'usuario':                
                data = await Usuario.find({
                    nombre: regex
                });
                
                break;
            case 'medico':
                data = await Medico.find({
                    nombre: regex
                }).populate(
                    'usuario','nombre img'
                ).populate(
                    'hospital','nombre img'
                );                
                break;
            case 'hospital':
                data = await Hospital.find({
                    nombre: regex
                }).populate(
                    'usuario','nombre img'
                );                
                break;
            default:
                return res.status(400).json(
                    {
                        "codigo" : "0000",
                        "mensaje": "La tabla tiene que ser Usuario, Medico y Hospitales.",                                                
                    });
        }
        
        res.status(200).json(
            {
                "codigo" : "0000",
                "mensaje": "Busqueda exitosa",
                data                        
            }
        );
        
    } catch (error) {
        res.status(500).json(
            {
                "codigo": "9000",
                "mensaje": "Error inesperado al consultar la busqueda ... revisar el logs"
            }
        );
    }
}

module.exports = { 
    getBusquedaTotal,
    getBusquedaColeccionTabla
}