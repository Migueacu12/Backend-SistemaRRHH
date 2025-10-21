/* Tabla que contiene la informacion de los tipos de contrato que pueden tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class TipoContratoModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
TipoContratoModel.init({

    id_tipo_contrato:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_tipo_contrato:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'tipo_contrato',
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoContratoModel