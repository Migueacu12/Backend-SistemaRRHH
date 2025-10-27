const EmpleadoModel = require('../Models/EmpleadoModel')
const sequelize = require('../config/configBD');

const JefeDirectoController = {

    getAll: async(_req,res)=>{
        const empleados = await EmpleadoModel.findAll({where:{empleados_a_cargo:1},attributes:['id_empleado','nombres']})
        res.json(empleados)
    },

    getTableData: async(_req,res)=>{
        const empleados = await sequelize.query('SELECT emp.id_empleado, emp.nombres, emp.apellidos, emp.numero_identificacion, count(emp2.id_empleado)empleados FROM `empleado` emp LEFT JOIN empleado emp2 on emp2.jefe_directo_fk = emp.id_empleado WHERE emp.`empleados_a_cargo` = 1 group by emp.id_empleado, emp.nombres, emp.apellidos, emp.numero_identificacion')
        res.json(empleados[0])
    },

    getEmp: async(_req,res)=>{
        const empleados = await EmpleadoModel.findAll({where:{empleados_a_cargo:0},attributes:['id_empleado','nombres','apellidos','numero_identificacion', 'src_fotografia']})
        res.json(empleados)
    },

    create: async(req,res)=>{
        await EmpleadoModel.update({empleados_a_cargo:1},{where:{id_empleado:req.body.id_empleado}}).then(()=>{
            res.json('cargo jefe creado')
        })
    },

    delete: async(req,res)=>{
        await EmpleadoModel.update({empleados_a_cargo:0},{where:{id_empleado:req.body.id_empleado}}).then(()=>{
            res.json('cargo jefe Borrado')
        })
    }

    

}

module.exports = JefeDirectoController
