/* Tabla Documento que sera la encargada de almacenar el nombre y la ruta 
    donde se encuentran todos los ducumentos subidos por los usuarios */

//Para empezar se importan 2 objetos de la libreria sequelizew
// Model es la superclase que contiene toda la estructura para el mapeo de una tabla
//Datatypes contiene toda la información de los tipos de datos disponibles que se pueden usar en cada uno de los campos de la tabla, creando asi restricciones y un mejor control del flujo de información de la base de datos
const { Model, DataTypes} = require('sequelize');

//Llamamos a sequelize nuestra configuración de la conexion a la base de datos
const sequelize = require('../configBD');

//creamos clase hija que ereda los atributos y metodos de la super clase Model
class DocumentoModel extends Model {};

//Usamos el metodo init de nuestra clase DocumentoModel para realizar el respectivo mapeo de la tabla con nombre similar
DocumentoModel.init({
    //Primero como argumentos el metodo init nos solicita pasarle los campos de la tabla que vamos a necesitar

    //El primer campo de nuestra tabla es id_documento que sera el identificador de cada registro de la tabla
    id_documento:{
        //Establecemos que sera un dato de tipo númerico (INTEGER)
        type: DataTypes.INTEGER,
        //Indicamos que sera la llave primaria de la tabla
        primaryKey: true,
        //Establecemos que este campo tendra un auto incremento segun el ultimo registro de la tabla
        autoIncrement: true
    },

    //El segundo campo es el nombre de documento el cual corresponde a como se va a mostrar este documento en el front
    nombre_documento:{
        //Este campo sera de tipo String(Texto)
        //Con un limite de 30 caracteres
        type: DataTypes.STRING(30),
        //Aparte de todo lo anterior este campo es obligatorio
        allowNull: false
        //No es un campo unico ya que pueden existir varios documentos con el mismo nombre
    },

    //El siguiente campo es la ruta donde va a estar el documento
    //Ya que al ser un archivo es muy complejo almacenarlo tal cual en la BD
    src_documento:{
        //Este campo sera de tipo texto(String)
        //Con una restriccion de 200 caracteres como maximo
        type: DataTypes.STRING(200),
        //Como es una ruta para encontrar un respectivo archivo es unico  
        unique: true,
        //Es obligatorio ya que sin este dato el registro quedaria inutil
        allowNull: false
    },

    //Indicamos el tipo de documento para tener mayor gestion de este
    tipo_documento_fk:{
        //Como es una llave foranea este tipo de dato es entero/númerico(Integer)
        type: DataTypes.INTEGER,
        //Es un campo obligatorio, pero no unico ya que varios documentos pueden tener el mismo tipo de documento
        allowNull: false
    },

    //El siguiente campo es el empleado que sube el documento
    //Se ingresa el id del empleado y se crea la relación con este
    empleado_fk:{
        //Se agrega el tipo de dato el cual es entero(Ya que el id es un número)
        type: DataTypes.INTEGER,
        //Es un campo obligatorio pero no unico
        allowNull: false
    }

},{
    //Agregamos la conexion a nuestra base de datos
    sequelize,
    //Le asignamos un nombre para identificarlo
    modelName: 'documento',
    //Le decimos que no requerimos la fecha de creación, ni la fecha de actualización
    timestamps: false,
    //Indicamos que congele el nombre de la tabla para evitar que agregue una s (Esto lo tiene por defecto para el idioma en ingles)
    freezeTableName: true
});

//Exportamos nuestra clase que contiene el mapeo a la tabla en la BD
module.exports = DocumentoModel