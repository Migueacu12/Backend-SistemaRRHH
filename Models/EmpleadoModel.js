/* Mapeo de la tabla que va a almacenar toda la información de los empleados */

// Como en todas que se estan mapeando se requiere importar la superclase Model
// Model tiene la respectiva configuración para realizar el mapeo a las tablas de la BD
// DataTypes Solo contiene la información de los tipos de datos disponibles, para crear restriccion y evitar mal ingreso de la información a la BD
//? DataTypes no asegura por si solo el correcto ingreso de información a la BD
const { Model, DataTypes} = require('sequelize');

//Importamos la conexion a la BD 
const sequelize = require('../configBD');

//Creamos una clase que hereda todos los atributos de la superclase Model
class EmpleadoModel extends Model {};

//Usamos el metodo init para realizar el respectivo mapeo de la tabla
EmpleadoModel.init({
    //Como se ha mencionado antes para el mapeo la función solicita pasar como argumentos los campos que se requieren en la tabla

    //El primer campo requerido es el id
    //Ya que se necesita un identificador para gestionar la información de manera mas optima
    id_empleado:{
        //Como es un ID sera de tipo entero
        type: DataTypes.INTEGER,
        //Establecemos que este campo sera llave primaria de la tabla 
        primaryKey: true,
        //Tambien se le indica a la tabla que este campo va a aumentar de manera automatica en cada nuevo registro, para evitarnos errores de dulicidad
        autoIncrement: true
    },

    //El siguiente campo es estado}
    //Ya que cuando un empleado se retire de la empresa este no tendra acceso a la información
    //Pero la información del empelado queda registrada por temas logicos
    //Así que solo se inactiva y no se borra
    estado:{
        //Como el estado solo tiene 2 valores "Activo" y "Inactivo"
        //El tipo de dato sera Booleano que solo puede ser 1 o 0 donde cada número se relaciona a un estado
        type: DataTypes.BOOLEAN,
        // Como el estado de un empleado que recien se crea es activo se define este valor por defecto
        defaultValue: 1
    },

    //Creamos un campo que tendra una relacion directa a la tabla "tipo_identificación"
    //Es una relación ya que el tipo de documento se repite en varios empleados
    //Y sale más rentable almacenar un número en un campo que almacenar un nombre completo
    tipo_identificacion_fk:{
        //Al ser foranea su tipo de dato es númerico
        type: DataTypes.INTEGER,
        //Y es obligatorio
        allowNull:false
    },

    //El siguiente campo es el número de identificación
    numero_identificacion:{
        //Es tipo de dato String(Texto) 
        //Ya que con este número no se van a realizar operaciónes matematicas
        type: DataTypes.STRING(20),
        //Es un campo unico ya que no pueden existir 2 o más empleados con el mismo número de documento
        unique:{
            //Aquí se esta estableciendo el mensaje de error que va a retornar en caso de que falle por duplicidad de la información
            msg: 'Número de identificación ya registrado en el sistema'
        },
        //Aparte se Establece que este campo es obligatorio
        allowNull:false
    },

    //El siguiente campo es los nombres del empleado
    nombres:{
        //Tipo String con maximo de 25 caracteres
        type: DataTypes.STRING(25),
        //Se indica que es un campo obligatorio
        allowNull:false
    },

    //El proximo campo son los apellidos del empleado
    //?Este al igual que el campo de nombres no tiene muchas restricciones
    apellidos:{
        type: DataTypes.STRING(25),
        allowNull:false
    },

    //El siguiente campo es genero del empelado
    genero:{
        //El genero es tipo Booleano(1 o 0)
        //Esto a solicitud del cliente que requiere solo 2 variaciones de esto
        type: DataTypes.BOOLEAN,
        //Es un campo obligatorio
        allowNull:false
    },

    //El siguiente es la fecha de nacimiento del empleado
    fecha_nacimiento:{
        //Indicamos que el tipo de dato es Fecha solamente (DATEONLY)
        //Ya que si ponemos solo fecha(DATE) Toma tambien registro de la hora y creara errores a futuro
        type: DataTypes.DATEONLY,
        //Es un campo obligatorio
        allowNull:false
    },

    //El proximo campo es el lugar de nacimiento del empleado
    //Tiene referencia a la tabla de ciudad 
    lugar_nacimiento_fk:{
        //Como es una llave foranea su tipo de dato es númerico
        type: DataTypes.INTEGER,
        //Es un campo obligatorio
        allowNull:false
    },

    //El siguiente campo hace referencia a la fecha en la que el documento del empleado fue expedido
    //?Tiene la misma logica de uso que el campo de fecha_nacimiento
    fecha_expedicion_doc:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },

    //Campo que hace referencia al lugar donde fue expedido el documento del empleado
    //?Cuenta con la misma logica de lugar_nacimiento_fk
    lugar_exp_doc_fk:{
        type: DataTypes.INTEGER,
        allowNull:false
    },

    //Siguiente campo es nacionalidad, el mismo nombre indica a que hace referencia
    //Foranea de la tabla nacionalidad
    nacionalidad_fk:{
        //Su tipo de dato es entero
        type: DataTypes.INTEGER,
        //Es obligatorio
        allowNull:false
    },

    //Campo que hace referencia al estado civil del empelado
    //? Misma logica de las otras tablas de llaves foraneas (nacionalidad_fk,lugar_nacimiento_fk)
    estado_civil_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que indica cual es el centro del costo al que pertenece el empleado
    //?Cuenta con la misma logica de tabla de llave foranea explicada antes
    centro_costo_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Ciudad donde labora el empleado
    //?Misma logica de las foraneas que tienen relacion con la tabla ciudad 
    lugar_trabajo_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Siguiente campo hace referencia a el cargo que tiene el empleado
    //?Logica de foraneas, que es explicada en el archivo de foraneas "RelacionesBD.js"
    cargo_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que hace referencia al tipo de contrato que tiene el empleado
    //?Similar a la logica explicada anterior mente
    tipo_contrato_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que hace referencia al tipo de tiempo que cumple un empleado
    //?Logica de llaves foraneas
    tipo_tiempo_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //El siguiente campo hace referencia a la fecha en la que ingreso el empelado a la empresa
    //?Logica de fechas 
    fecha_ingreso:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    //El siguiente campo hace referencia al jefe directo del empleado
    //Es una foranea que hace referencia a esta misma tabla
    //Su logica es explicada en el archivo de relaciones
    //Como no tiene mucahs restricciones con solo poner el tipo de dato ya se crea el campo
    jefe_directo_fk:DataTypes.INTEGER,

    //Campo que almacenara el estado en el que se encuentra el contrato del empleado
    //?Logica de foraneas
    estado_contrato_fk:{
        type: DataTypes.INTEGER,
        allowNull:false
    },

    //Campo que almacena el saralio de un empleado
    //Se hizo foranea ya que muchos empelados comparten el mismo salario
    //Y end ado caso que suba o baje un salario general sera solo modificarlo en una seccion para que cambie en todo lado
    salario_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena el auxilio de transporte del empleado
    //?Misma logica que el campo de salario
    aux_movilidad_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena la direccion de correo electronico del empelado
    correo_electronico:{
        //Tipo de dato String
        //Maximo de caracteres 50
        type: DataTypes.STRING(50),
        //Campo obligatorio
        allowNull: false,
        //El correo solo puede existir en un unico registro
        unique:{
            //En caso de que se intente registrar otro correo el sistema devolvera el siguiente mensaje de error
            msg: 'Correo electronico ya registrado en el sistema'
        },
    },

    //Direccion de la residencia del empleado
    direccion:{
        //Tipo de dato es texto con un maximo de 50 caracteres
        type: DataTypes.STRING(50),
        //Campo obligatorio
        allowNull: false
    },

    //campo que almacena el telefono fijo del empleado
    telefono_fijo:{
        //Tipo de dato texto(STRING)
        //Maximo de 20 caracteres
        //Es tipo texto ya que con este campo no se haran opereciones matematicas
        type: DataTypes.STRING(20),
        //campo obligatorio
        allowNull: false
    },

    //El siguiente campo almacenara el celular de contacto del empleado
    celular:{
        //Tipo de dato texto con restriccion de 20 cracteres como maximo
        //Es tipo texto ya que no se requieren hacer operaciones matematicas
        type: DataTypes.STRING(20),
        //Es un campo obligatorio
        allowNull: false
    },

    //Campo que hace referencia a los estudios alcansados por el empleado
    //?Logica de foraneas
    estudios_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que hace referencia a el banco donde está asociado el empelado
    //?Logica de foraneas
    banco_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena el tipo de cuenta que tiene el empleado
    //?Logica de foraneas
    tipo_cuenta_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //El siguiente campo almacena el número de cuenta del empleado
    num_cuenta:{
        //Tipo de dato String con maximo de 20 caracteres
        //Tipo Texto ya que no se necesitan hacer operaciones con este número
        type: DataTypes.STRING(20),
        //campo obligatorio
        allowNull: false
    },

    //Campo que hace referencia a la eps a la que esta afiliado el empleado
    //?Logica de foraneas
    eps_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que indica a cual arl está asociada el empelado
    //?Logica foraneas 
    arl_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que indica el riesgo que tiene un empelado
    riesgo:{
        //Es tipo de dato flotante/decimal(FLOAT) ya que asi se requiere
        type: DataTypes.FLOAT,
        //Es un campo obligatorio
        allowNull: false
    },

    //Campo que almacena que pension tiene asignada un empleado
    //?Logica de foraneas
    pension_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena las cesantias que un empleado tiene asignadas
    //?Logica de foraneas
    cesantias_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que indica a que caja de compensacion familiar está asociada el empleado
    //?Logica de foraneas 
    ccf_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena el nombre de la persona encargada del empelado en caso de emergencia
    contacto_emergencia:{
        //Tipo de dato Texto con maximo de 30 caracteres
        type: DataTypes.STRING(80),
    },

    //Campo que almacena el número del contacto de emergencia del empelado
    tel_contacto_emergencia:{
        //Tipo String(Texto) con maximo de 20 caracteres
        type: DataTypes.STRING(50),
        //Campo obligatorio
        allowNull: false
    },

    //Campo que almacena la información de la talla de la camisa del empleado
    //Se hizo una tabla para controlar que información se dijita y facilitar la busqueda
    //?Cuenta con la misma logica de las foraneas
    talla_camisa_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena la informacion de que talla de pantalon tiene el empleado
    //?Foranea similar a talla camisa
    talla_pantalon_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena la información de la talla de calzado del empelado
    //?Similar a las foraneas de talla
    talla_calzado_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo que almacena la empresa en la que el empleado labora
    //Sus campos son explicados en la respectiva tabla
    //?Similar a llaves foraneas
    empresa_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Campo sencillo que almacena la ruta donde se encuentra la fotografía del empleado
    //Tiene un maximo de 100 caracteres
    src_fotografia: DataTypes.STRING(100),

    //Campo que almacena que rol tiene un determinado usuario (Soporte, Admin, Empelado)
    //Para de esta manera gestionar el uso correcto de la información
    //Su valor por defecto al crear un nuevo empleado es 3 = "Empelado"
    tipo_usuario_fk:{
        type: DataTypes.INTEGER,
        defaultValue: 3
    },

    //Este campo indica si tiene o no empelados a cargo esto para mostrarlo en la respectiva tabla y hacer un mejor filtrado de la información
    empleados_a_cargo:{
        //Tipo de dato booleano(1 O 0) ya que 1 es que si tiene y 0 es que no tiene
        type:DataTypes.BOOLEAN,
        //Cuenta con valor por defecto de 0
        defaultValue:0
    },

    //El ultimo campo de la tabla indica la ultima fecha en la que se genero un certificado laboral
    fecha_gen_certificado: DataTypes.DATEONLY
    
},{
    //Conexion a la base de datos donde se esta mapeando la tabla
    sequelize,
    //Nombre del modelo para hacer uso de este mas adelante
    modelName: 'empleado',
    //Indicamos que no se reqiere la creación de campos de fecha creado y actualizacion empelado
    timestamps: false,
    //Congelamos el nombre de la tabla para evitar errores
    freezeTableName: true
});

//Exportamos el mapeo de la tabla para hacer uso de este mas adelante
module.exports = EmpleadoModel