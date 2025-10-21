/* Tabla que almacenara toda la información relacionada a los cargos que puedan tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class CargoModel extends Model {};

//Se usa el metodo init en el cual apartir de unos parametros dados realizara el mapeo
//?La explicación basica de cada campo esta explicada en otros Modelos
CargoModel.init({

    id_cargo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_cargo:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'cargo',
    timestamps: false,
    freezeTableName: true
});

module.exports = CargoModel