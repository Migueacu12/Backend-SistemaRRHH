/* Tabla que almacena las posibles nacionalidades de los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class NacionalidadModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
NacionalidadModel.init({

    id_nacionalidad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_nacionalidad:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'nacionalidad',
    timestamps: false,
    freezeTableName: true
});

module.exports = NacionalidadModel