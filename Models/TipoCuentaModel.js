/* Tabla que hace referencia a los tipos de cuenta que pueden tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class TipoCuentaModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
TipoCuentaModel.init({

    id_tipo_cuenta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_tipo_cuenta:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'tipo_cuenta',
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoCuentaModel