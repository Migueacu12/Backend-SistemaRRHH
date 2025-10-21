/* Tabla que contiene todos los posibles datos para eps que pueden tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class EpsModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
EpsModel.init({

    id_eps:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_eps:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'eps',
    timestamps: false,
    tableName: 'eps'
});

module.exports = EpsModel