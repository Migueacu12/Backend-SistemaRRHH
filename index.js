//Index.js es el archivo principal del API donde ejecutamos nuestro servidor y definimos los metodos que se van a usar

const express = require('express');
const app = express();

require('dotenv').config();

// Configuración de la base de datos
const sequelize = require('./Database/Models/Database/configBD');
const PORT = process.env.PORT || 3003;

// Relación de modelos
require('./Database/Models/Database/relacionesBD');

// Middlewares para recibir parámetros por el cuerpo de la consulta (tipo JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configura el límite de tamaño máximo para las solicitudes
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb', extended: true }));

// Middleware de CORS para evitar errores de cabeceras
const cors = require('cors');
app.use(cors());

/** 
 * =========== SECCIÓN DE AUTENTICACIÓN ===========
 */
const authRouter = require('./Database/Models/router/routes/authRouter');
app.use('/api-rrhh/auth', authRouter);

// Rutas principales
app.use('/api-rrhh', require('./Database/Models/router/routes/router'));

/**
 * =========== MANEJO DE ERRORES GLOBAL ===========
 */
const errorHandler = require('./Database/Models/middlewares/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`El proyecto ha sido arrancado en http://localhost:${PORT}`);

    sequelize.sync({ force: false }).then(() => {
        console.log('Conexion a la bd exitosa');
    }).catch(error => {
        console.log('Error al conectar la bd: ' + error)
    });
});