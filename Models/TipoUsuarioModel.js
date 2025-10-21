/* Tabla encargada de los tipos de usuario con los que cuenta el sistema */

//Se importa Model superclase que permite el mapeo
//Y DataType que permite dar un tipo de dato
const { Model, DataTypes} = require('sequelize');

//Se importa la conexion a la base de datos
const sequelize = require('../configBD');

//Se crea clase que heredara todos los atributos de Model
class TipoUsuarioModel extends Model {};

//Se usa el metodo init en el cual apartir de unos parametros dados realizara el mapeo
//?La explicación basica de cada campo esta explicada en otros Modelos
TipoUsuarioModel.init({

    id_tipo_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_tipo_usuario:{
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'tipo_usuario',
    timestamps: false,
    freezeTableName: true
});

module.exports = TipoUsuarioModel