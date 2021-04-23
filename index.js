// Creando importaciones node
require('dotenv').config();

const expres = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Creando el servidor express
const app = expres();

// Base de datos:
// Credenciales para Mondo BD:
// usuario: admin
// contraseña: ildnap5tmSSojNMh
dbConnection();

//console.log(process.env);

// Configurando Cors:
app.use(cors());

// Creando rutas:
app.get( '/', (req, res)=> {

    res.json(
        { 
            "estado" : "Ok",
            "mensaje" : " Bienvenido Visitante"
        }
    );

});

app.listen(process.env.PORT, ()=>{
    console.log(' Levantando servidor en puerto ' + process.env.PORT);
});


