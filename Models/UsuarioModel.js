const { DataTypes } = require('sequelize');
const sequelize = require('../configBD'); // Importa la configuración de la base de datos

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoUsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'usuarios',   // El nombre real de tu tabla en MySQL
  timestamps: false        // Cambia a true si usas createdAt/updatedAt
});

module.exports = Usuario;