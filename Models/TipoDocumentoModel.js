/* Tabla que almacenara los tipos de documentos que se pueden subir al sistema */

//Primero importar la superclase Model que contendra todos los metodos para hacer el mapeo a la tabla
//Tambien se hace uso de DateTypes el cual proporsionara los tipos de dato que se aceptan en cada campo
const { Model, DataTypes} = require('sequelize');

//Importamos la configuracion de la base de datos
const sequelize = require('../configBD');

//Creamos una clase que heredara todos los atributos y metodos de la superclase Model
class TipoDocumentoModel extends Model {};

//Con nuestra clase TipoDocumentoModel, se usa el metodo init para realizar el mapeo de la tabla
TipoDocumentoModel.init({
    //Primero indicamos que campos va a tener nuestra tabla y sus restricciones

    //El primer atributo que denominamos es el id
    //El cual nos sirve como campo identificador de cada registro
    id_tipo_documento:{
        //El id es de tipo númerico
        type: DataTypes.INTEGER,
        //Indicamos que va a ser la llave primaria de la tabla
        primaryKey: true,
        //Indicamos que este campo es autoincrementable
        autoIncrement: true
    },

    //El siguiente hace referencia a que nombre tiene el tipo de documento asignado
    nombre_tipo_documento:{
        //Tipo de dato texto(String)
        //Maximo de caracteres permitidos 25
        type: DataTypes.STRING(25),
        //Es un campo unico, para evitar duplicidad de la información
        unique: true,
        //Es un campo obligatorio
        allowNull: false
    }

},{
    //Conexion a la base de datos donde se esta haciendo el mapeo de la tabla
    sequelize,
    //Nombre del modelo
    modelName: 'tipo_documento',
    //Establecer que no se requiere la fecha de creación ni la fecha de actualización
    timestamps: false,
    //Congelamos el nombre de la tabla para evitar lios con la "s"
    freezeTableName:true
});

//Exportamos la tabla para hacer uso de ella en otro momento
module.exports = TipoDocumentoModel