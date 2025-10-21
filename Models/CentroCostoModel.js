/* Tabla que almacenara todos los centros de costo de la compañia */
//?Explicación basica se encuentra en los otros Modelos

const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class CentroCostoModel extends Model {};

CentroCostoModel.init({

    id_centro_costo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_centro_costo:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    },

    //Campo que contiene la ciudad donde se encuentra el centro de costo
    id_ciudad_fk:{
        //Tipo de dato númerico
        type: DataTypes.INTEGER,
        //Obligatorio
        allowNull: false
    }

},{
    sequelize,
    modelName: 'centro_costo',
    timestamps: false,
    freezeTableName: true
});

module.exports = CentroCostoModel