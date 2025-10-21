/* Tabla que contiene la información de las tallas de camisa que pueden tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class TallaCamisaModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
TallaCamisaModel.init({

    id_talla_camisa:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_talla_camisa:{
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'talla_camisa',
    timestamps: false,
    freezeTableName: true
});

module.exports = TallaCamisaModel