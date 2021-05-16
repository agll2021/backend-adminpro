const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs');

const borrarImagen = (path)=>{
    if(fs.existsSync(path))
        fs.unlinkSync(path); // elimina el archivo anterior en el caso de que exista 

}

const actualizadImg = async ( tablaParam, id, uuidArchivo )=>{
    let rutaImgAnterior;
    try {
        switch (tablaParam) {
            case 'medico':
                const medico = await Medico.findById(id);
                if(!medico)
                    return false;
    
                // validar que el archivo anterio existe con node mediante la libreria FS (FILESYSTEM)
                rutaImgAnterior = `./upload/medico/${medico.img}`;
                borrarImagen(rutaImgAnterior);
                 medico.img = uuidArchivo;
                await medico.save();    
                
                return true;
    
                break;
        
            case 'hospital':
                const hospital = await Hospital.findById(id);
                if(!hospital)
                    return false;
    
                // validar que el archivo anterio existe con node mediante la libreria FS (FILESYSTEM)
                rutaImgAnterior = `./upload/hospital/${hospital.img}`;
                borrarImagen(rutaImgAnterior);

                hospital.img = uuidArchivo;
                await hospital.save();    
                
                return true;
                break;
    
            case 'usuario':
                const usuario = await Usuario.findById(id);
                if(!usuario)
                    return false;
    
                // validar que el archivo anterio existe con node mediante la libreria FS (FILESYSTEM)
                rutaImgAnterior = `./upload/usuario/${usuario.img}`;                
                //rutaImgAnterior = `C:/Users/Work-PC/Documents/Angular-adv/upload/usuario/${usuario.img}`;
                borrarImagen(rutaImgAnterior);
               
                usuario.img = uuidArchivo;
                await usuario.save();    
            break;        
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(
            {
                "codigo" : "9000",
                "buqueda": "Error uuid ingresado."                    
            }
        );
    }


   


}

module.exports = { actualizadImg };