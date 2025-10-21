/* Tabla encargada de almacenar todos lo posibles valores de tallas que pueden tener los empleados */

const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class TallaCalzadoModel extends Model {};


//Se usa el metodo init en el cual apartir de unos parametros dados realizara el mapeo
//?La explicación basica de cada campo esta explicada en otros Modelos
TallaCalzadoModel.init({

    id_talla_calzado:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_talla_calzado:{
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'talla_calzado',
    timestamps: false,
    freezeTableName: true
});

module.exports = TallaCalzadoModel