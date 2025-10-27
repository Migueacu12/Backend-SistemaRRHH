const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sistemarrhh',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa (Sequelize)');
  } catch (err) {
    console.error('Error conectando a la BD (Sequelize):', err.message || err);
    process.exit(1);
  }
})();

module.exports = sequelize;
