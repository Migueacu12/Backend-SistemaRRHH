/* Tabla que contiene los datos referentes a el auxilio de movilidad */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class AuxMovilidadModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
AuxMovilidadModel.init({

    id_aux_movilidad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    monto_aux_movilidad:{
        type: DataTypes.DOUBLE,
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'aux_movilidad',
    timestamps: false,
    freezeTableName: true
});

module.exports = AuxMovilidadModel