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

// Lectura y parseo del body: ( Se recomienda antes que las rutas)
app.use( expres.json() );


// Inicio Creando rutas:
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


// Fin Creando rutas:

app.listen(process.env.PORT, ()=>{
    console.log(' Levantando servidor en puerto ' + process.env.PORT);
});


