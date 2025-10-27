const express = require('express');
const app = express();
require('dotenv').config();

const sequelize = require('./config/configBD.js');
const PORT = process.env.PORT || 3003;

// Cargar relaciones (archivo Models/Database/relacionesBD.js)
try {
  require('./Models/Database/relacionesBD');
} catch (err) {
  console.error('Aviso: no se pudo cargar Models/Database/relacionesBD:', err.message);
}

// Middlewares
const cors = require('cors');
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb', extended: true }));
app.use(cors());

// Rutas de autenticación y principales
try {
  const authRouter = require('./routes/authRouter');
  app.use('/api-rrhh/auth', authRouter);
} catch (err) {
  console.error('Aviso: no se pudo cargar routes/authRouter:', err.message);
}

try {
  app.use('/api-rrhh', require('./routes/router'));
} catch (err) {
  console.error('Aviso: no se pudo cargar routes/router:', err.message);
}

// Manejador global de errores (si existe)
try {
  const errorHandler = require('./middlewares/errorHandler');
  app.use(errorHandler);
} catch (err) {
  console.error('Aviso: no se pudo cargar middlewares/errorHandler:', err.message);
}

app.listen(PORT, () => {
  console.log(`El proyecto ha sido arrancado en http://localhost:${PORT}`);

  // Sincronizar modelos con la BD
  if (sequelize && typeof sequelize.sync === 'function') {
    sequelize.sync({ force: false })
      .then(() => console.log('Conexion a la bd exitosa'))
      .catch(error => console.log('Error al conectar la bd: ' + error));
  } else {
    console.warn('La instancia de sequelize no está disponible. Revisa config/configBD.js');
  }
});
