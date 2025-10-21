/* Tabla encargada de almacenar los bancos que pueden tener los empelados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class BancoModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
BancoModel.init({

    id_banco:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_banco:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'banco',
    timestamps: false,
    freezeTableName: true
});

module.exports = BancoModel