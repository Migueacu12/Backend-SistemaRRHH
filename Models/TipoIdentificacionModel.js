/* Tabla que contiene los tipos de identificacion que puede tener un empleado */

//En primer lugar importar la superclase Model que tendra los atributos para el mapeo
//Tambien de la misma libreria se requiere DataTypes el cual contendra los tipos de datos que va a tener cada campo
const { Model, DataTypes} = require('sequelize');

//Conexion a la base de datos
const sequelize = require('../configBD');

//Creacion de una clase que contendra todos los atributos de la superclase Model
class TipoidentificacionModel extends Model {};

//Se usa el metodo init para crear el mapeo a la tabla
TipoidentificacionModel.init({
    //Como los otros mapeos requiere los campos de la tabla

    //El primer campo es el id
    //El identificador de cada registro de la tabla
    id_tipo_identificacion:{
        //Tipo de dato es entero
        type: DataTypes.INTEGER,
        //Le indicamos que sera la llave primaria de la tabla
        primaryKey: true,
        //Y que si valor es auto incrementable
        autoIncrement: true
    },

    //El siguiente campo hace referencia al nombre del tipo de identificación 
    nombre_tipo_identificacion:{
        //Tipo String(texto) con maximo de 20 caracteres
        type: DataTypes.STRING(20),
        //Es un campo unico y no se pueden repetir registros con el mismo nombre para evitar duplicidad de la información
        unique: true,
        //Es un campo obligatorio
        allowNull: false
    }

},{
    //Conexion a la base de datos
    sequelize,
    //Nombre del modelo
    modelName: 'tipo_identificacion',
    //Indicamos que no se requiere fechas de creación y actualización
    timestamps: false,
    //Congelamos el nombre de la tabla
    freezeTableName: true
});

//Exportamos el mapeo para poder usarlo en otros archivos
module.exports = TipoidentificacionModel