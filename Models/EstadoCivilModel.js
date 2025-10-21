/* Tabla que se encarga de almacenar los estados civiles que podrian tener los empleados */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class EstadoCivilModel extends Model {};


//Se usa el metodo init en el cual apartir de unos parametros dados realizara el mapeo
//?La explicación basica de cada campo esta explicada en otros Modelos
EstadoCivilModel.init({

    id_estado_civil:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_estado_civil:{
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'estado_civil',
    timestamps: false,
    freezeTableName: true
});

module.exports = EstadoCivilModel