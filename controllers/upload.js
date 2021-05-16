const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizadImg } = require('../helpers/updateImg');

const fileUpload = (req, res = response)=>{
    
    const tablaParam = req.params.tabla;
    const id = req.params.id;
    
    //validar tabla
    const tablasValidas =['usuario', 'medico', 'hospital'];

    if(!tablasValidas.includes(tablaParam))
        return res.status(400).json(
            {
                "codigo" : "6000",
                "buqueda": "No pertenece a las tablas validas (usuario, medico y hospital)."
            }
        );

    // validar de la existencia el archivo
    if(!req.files || Object.keys(req.files).length == 0)
        return res.status(400).json(
            {
                "codigo" : "6000",
                "buqueda": "No cargo ningun archivo."
            }
        );

    // procesando la imagen:
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1];

    // validar extension
    const extensionesValidas = ['jpg','png','pdf'];
    
    if(!extensionesValidas.includes(extension))
    return res.status(400).json(
        {
            "codigo" : "6000",
            "buqueda": "No pertenece a las extensiones validas (jpg, png, pdf)."
        }
    );    

    // generando el uuid del archivo:
    const uuidArchivo = `${uuidv4()}.${extension}`

    // ruta para guardar la ubicacion fisica de la imagen: 
    const ruta = `./upload/${ tablaParam }/${ uuidArchivo }`;
    //const ruta = `C:/Users/Work-PC/Documents/Angular-adv/upload/${ tablaParam }/${ uuidArchivo }`;
    // Mover la imagen:
    file.mv(ruta, (err)=> {
        if (err){
            console.log(err);
            return res.status(500).json(
                {
                    "codigo" : "9000",
                    "buqueda": "Error al mover la imagen."
                }
            );
        }
          
        // actualizar imagen 
        console.log(' respuesta: '+ actualizadImg(tablaParam, id, uuidArchivo ));
        if(actualizadImg(tablaParam, id, uuidArchivo ))
        {
            res.status(200).json(
                {
                    "codigo" : "0000",
                    "buqueda": "Carga exitosa",
                    uuidArchivo
                }
            );
        }else{
            res.status(400).json(
                {
                    "codigo" : "0000",
                    "buqueda": "No se realizo la carga del archivo."                    
                }
            );
        }

        
      });

    
}

const obtenerArchivo = (req, res = response)=>{

    const tablaParam = req.params.tabla;
    const foto = req.params.foto;
    let rutaImg = '';
    //validar tabla
    const tablasValidas =['usuario', 'medico', 'hospital'];

    if(!tablasValidas.includes(tablaParam))
        return res.status(400).json(
            {
                "codigo" : "6000",
                "buqueda": "No pertenece a las tablas validas (usuario, medico y hospital)."
            }
        );
     // ruta para guardar la ubicacion fisica de la imagen: 
    //const ruta = `./upload/${ tablaParam }/${ foto }`;
    rutaImg = path.join(__dirname, `../upload/${ tablaParam }/${ foto }`);

    if(fs.existsSync(rutaImg))
        res.sendFile(rutaImg);    
    else 
       res.sendFile(path.join(__dirname, `../upload/no-img.jpg`));
        
    
}

module.exports = { 
    fileUpload,
    obtenerArchivo
}