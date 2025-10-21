/* Tabla que contiene los posibles valores para la ARL */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class ArlModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
ArlModel.init({

    id_arl:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_arl:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'arl',
    timestamps: false,
    freezeTableName: true
});


module.exports = ArlModel