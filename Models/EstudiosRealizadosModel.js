/* Tabla que alberga toda la información correspondiente a los estudios realizados por los empelados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class EstudiosRealizadosModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
EstudiosRealizadosModel.init({

    id_estudios:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_estudios:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'estudios_realizados',
    timestamps: false,
    tableName: 'estudios_realizados'
});

module.exports = EstudiosRealizadosModel