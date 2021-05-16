const { Schema, model } = require('mongoose');


// Registro de una coleccion de medico:
const MedicoSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    img:{
        type: String         
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true         
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true        
    },

},{ collection: 'medicos'});

// metodo para modificar algunos campos del json, respecto a los nombres:
MedicoSchema.method('toJSON', function(){
    // Obteniendo la instancia acutal con la clase Object de Mongoose, donde tiene almacenado 
    // los campos de la metadata y poder modificarlo.

    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
});


module.exports = model('Medico', MedicoSchema);
