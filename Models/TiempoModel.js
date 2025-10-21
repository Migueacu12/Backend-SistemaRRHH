/* Tabla que almacena la información de las posibles opciones de tipo tiempo que tienen los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class TiempoModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
TiempoModel.init({

    id_tiempo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_tiempo:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'tiempo',
    timestamps: false,
    freezeTableName: true
});

module.exports = TiempoModel