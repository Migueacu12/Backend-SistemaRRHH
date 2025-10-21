/* Tabla que contiene los datos de los posibles estados de contrato que pueden llegar a tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class EstadoContratoModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
EstadoContratoModel.init({

    id_estado_contrato:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_estado_contrato:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'estado_contrato',
    timestamps: false,
    freezeTableName: true
});

module.exports = EstadoContratoModel