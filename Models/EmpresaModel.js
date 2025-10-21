/* Tabla  que almacenara las empresas de la compañia para relacionar empleados con estas */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class EmpresaModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
EmpresaModel.init({

    id_empresa:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_empresa:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },

    //Está tabla contiene el nit de la empresa
    nit:{
        //Tipo de dato es String
        //Con un maximo de 25 caracteres
        type: DataTypes.STRING(25),
        //El nit al igual que el nombre es unico y no se repite en ninguna empresa
        unique: true,
        //El campo es obligatorio
        allowNull: false
    }

},{
    sequelize,
    modelName: 'empresa',
    timestamps: false,
    freezeTableName: true
});

module.exports = EmpresaModel