const checkRolSoporte= (req, res, next) => {
    if(req.tipoUsuario === 'Soporte')
    next()
    else
    res.status(403).json({error:'Acceso denegado, rol requerido "Soporte"'})
}
const checkRolAdmin= (req, res, next) => {
    if(req.tipoUsuario === 'Soporte'||req.tipoUsuario === 'Admin')
    next()
    else
    res.status(403).json({error:'Acceso denegado, rol requerido "Admin" o "Soporte"'})
}

module.exports = { checkRolSoporte, checkRolAdmin}