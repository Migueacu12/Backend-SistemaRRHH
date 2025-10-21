/* Tabla que contiene todos los datos relacionados a la pension que pueden tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class PensionModel extends Model {};

//Se usa el metodo init en el cual apartir de unos parametros dados realizara el mapeo
//?La explicación basica de cada campo esta explicada en otros Modelos
PensionModel.init({

    id_pension:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_pension:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'pension',
    timestamps: false,
    freezeTableName: true
});

module.exports = PensionModel