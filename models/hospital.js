const { Schema, model } = require('mongoose');


// Registro de una coleccion de hospital:
const HospitalSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String         
    },
    usuario:{
        required: true,       
        type: Schema.Types.ObjectId,
        ref: 'Usuario',   
    },

},{ collection: 'hospitales'});

// metodo para modificar algunos campos del json, respecto a los nombres:
HospitalSchema.method('toJSON', function(){
    // Obteniendo la instancia acutal con la clase Object de Mongoose, donde tiene almacenado 
    // los campos de la metadata y poder modificarlo.

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
});


module.exports = model('Hospital', HospitalSchema);
