/* Tabla debil que almacena que documentos le faltan a cada usuario */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../configBD');

class DocumentosFaltantesModel extends Model {};

//?La explicación basica de cada campo esta explicada en otros Modelos
DocumentosFaltantesModel.init({

    //Como primer campo la tabla tiene el id del empleado al que le hace falta el documento
    id_empleado_fk:{
        //Tipo de dato númerico entero
        type: DataTypes.INTEGER,
        //Es llave primaria
        primaryKey: true,
        //Es obligatorio
        allowNull: false
    },

    //Como segundo parametro la tabla recibe el tipo de documento para hacer la relacion
    id_tipo_documento_fk:{
        //Tipo de dato númerico
        type: DataTypes.INTEGER,
        //Es llave primaria
        primaryKey: true,
        //Es obligatorio
        allowNull: false
    }

},{
    sequelize,
    modelName: 'documentos_faltantes',
    timestamps: false,
    tableName: 'documentos_faltantes'
});

module.exports = DocumentosFaltantesModel