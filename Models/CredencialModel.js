/* Archivo de mapeo para la tabla de credencial que tendra el nombre de usuario y la contraseña para el respectivo inicio de sesion en el sistema*/

//Importamos 2 objetos donde el fundamental es Model
//El cual permitira el mapeo a la tabla de credencial y si no existe la creara
//DataTypes es usado para obtener todos los tipos de datos que se usaran en las tablas
const { Model, DataTypes} = require('sequelize');

//Traemos nuestra respectiva configuración de la base de datos y la guardamos en la variable de sequelize
const sequelize = require('../configBD');

//Definimos una clase hija que heredara todos los atributos de la clase Model
class CredencialModel extends Model {};

//Usamos el metodo init de la clase CredencialModel el cual nos definira el mapeo a la base de datos de la tabla con nombre similar
CredencialModel.init({
    //Primero la tabla nos solicita agregar todos los campos que tendra
    
    //El primer campo es el id el cual contiene la llave principal para identificar cada registro de la tabla
    id_credencial:{
        //definimos el tipo de dato que en este caso será númerico
        type: DataTypes.INTEGER,
        //Indicamos que este campo es la llave primaria de la tabla
        primaryKey: true,
        //Establecemos un incremento automatico segun el ultimo registro de la tabla
        autoIncrement: true
    },

    //El siguiente campo es el nombre de usuario con el que se ingresara al sistema
    nombre_usuario:{
        //Establecemos que tendra un tipo de usuario String
        //Con un maximo de caracteres de 20
        type: DataTypes.STRING(20),
        //Como es nombre de usurio el campo no se puede repetir en otro registro
        unique: true,
        //Y es un dato obligatorio
        allowNull: false
    },

    //Siguiente campo es la contraseña para el ingreso al sistema
    contraseña:{
        //Definimos que sera tipo de dato String
        // y decimos que el maximo es de 150 caracteres 
        // La contraseña va encriptada y ocupa mas espacio en la bd
        type: DataTypes.STRING(150),
        //Es un campo obligatorio
        allowNull: false

        //No es unico ya que varios usuarios podrian tener la misma contraseña
    },

    //Foranea de la tabla Usuario para establecer una relacion con esa tabla
    usuario_fk:{
        //Tipo de dato es entero
        type: DataTypes.INTEGER,
        //Es un campo obligatorio
        allowNull: false,
        //En este caso es un campo unico para crear una relación de 1 a 1 entre las tablas de usuario y credencial
        unique: true
    }

},{
    //Llamamos la conexion a nuestra base de datos, para indicar donde se va a crear la tabla
    sequelize,
    //Establecemos el nombre del modelo
    modelName: 'credencial',
    //Indicamos que no deseamos los campos de fecah de creación y fecha actualización
    timestamps: false,
    //Congelamos el nombre de la tabla para evitar errores al momento de crearla
    freezeTableName: true
});

//Exportamos nuestra clase para hacer uso del modelo donde lo necesitemos 
module.exports = CredencialModel