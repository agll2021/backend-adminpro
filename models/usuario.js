const { Schema, model } = require('mongoose');


// Registro de una coleccion de usuarios:
const UsuarioSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    correo:{
        type: String,
        require: true,
        unique: true
    },
    contrasena:{
        type: String,
        required: true
    },
    img:{
        type: String         
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    },

});

// metodo para modificar algunos campos del json, respecto a los nombres:
UsuarioSchema.method('toJSON', function(){
    // Obteniendo la instancia acutal con la clase Object de Mongoose, donde tiene almacenado 
    // los campos de la metadata y poder modificarlo.

    const { __v, _id, contrasena, ...object } = this.toObject();

    object.uid = _id;
    return object;
});


module.exports = model('Usuario', UsuarioSchema);
