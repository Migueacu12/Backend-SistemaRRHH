/*Archivo de Creacion de una tabla de la base de datos
    Para esto se usa sequelize*/

//Primero importamos 2 objetos de sequelice
//Model es una superclase que contiene todos los metodos respectivos para el mapeo de una tabla de la base de datos
//Datatypes es un objeto que contiene todos los tipos de dato que se aceptan en la bd, creando restricciones segun el tipo de dato requerido
const { Model, DataTypes} = require('sequelize');

//Asi mismo importamos nuestra configuración de la base de datos
const sequelize = require('../configBD');

//Creamos una clase que hereda todos los atributos de la superclase Model
class CiudadModel extends Model {};

//Usando el metodo init vamos a crear/mapear la tabla en la base de datos
CiudadModel.init({
    //Definimos todos los campos de la tabla como objetos que tienen un tipo de dato y unas restricciones
    //El nombre del objeto sera el nombre del campo en la bd

    //Primero definimos un id con la denominación de la tabla
    id_ciudad:{
        //Decimos que su tipo de dato es un entero
        type: DataTypes.INTEGER,
        //Indicamos que es llave primaria
        primaryKey: true,
        //Decimos que este campo se incrementa solo segun el ultimo registro de la tabla
        autoIncrement: true
    },

    //El siguiente campo es el nombre
    nombre_ciudad:{
        //Definimos que el tipo de dato es String (Texto)
        //Y le establecemos como limite de caracteres 25 
        //en caso de que llegue un registro con mas de 25 caracteres la base de datos ignorara y borrara los carcteres que no quepan
        type: DataTypes.STRING(25),
        //Indicamos que es un campo unico y que no pueden haber mas registros con el mismo nombre
        unique: true,
        //Establecemos que este campo sera un campo obligatorio
        allowNull: false
    }

},{
    //Definimos la conexion a nuestra base de datos
    sequelize,
    //Establecemos el nombre de nuestro modelo
    modelName: 'ciudad',
    //Indicamos que no deseamos fecha de creacion, ni fecha de actualización del registro
    timestamps: false,
    //indicamos que queremos que se congele el nombre de la tabla, para evitar que el sistema agregue una "s" por defecto
    freezeTableName: true
});

//Exportamos nuestra clase para hacer uso de ella en otros archivos de nuestra API
module.exports = CiudadModel