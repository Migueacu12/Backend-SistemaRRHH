/* Tabla que contiene todos los posibles valores de cesantias que pueden tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class CesantiasModel extends Model {};

//Se usa el metodo init en el cual apartir de unos parametros dados realizara el mapeo
//?La explicación basica de cada campo esta explicada en otros Modelos
CesantiasModel.init({

    id_cesantias:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_cesantias:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'cesantias',
    timestamps: false,
    tableName: 'cesantias'
});

module.exports = CesantiasModel