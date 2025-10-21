/* Tabla que almacenara toda la información relacionada con la caja de compensacion familiar */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class CajaCompensacionModel extends Model {};

//Se usa el metodo init en el cual apartir de unos parametros dados realizara el mapeo
//?La explicación basica de cada campo esta explicada en otros Modelos
CajaCompensacionModel.init({

    id_caja_comp:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_caja_comp:{
        type: DataTypes.STRING(25),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'caja_compensacion',
    timestamps: false,
    freezeTableName: true
});

module.exports = CajaCompensacionModel