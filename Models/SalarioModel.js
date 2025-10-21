/* Tabla que contiene los posibles salarios de los empleados ya que varios de estos salarios se repiten */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class SalarioModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
SalarioModel.init({

    id_salario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    monto_salario:{
        type: DataTypes.DOUBLE,
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'salario',
    timestamps: false,
    freezeTableName: true
});

module.exports = SalarioModel