// middlewares/checkRol.js
// Middleware para comprobar roles. Usa antes authController.verifyToken
// Ejemplo de uso en rutas:
//   router.post('/ruta', verifyToken, checkRolSoporte, handler)
//   router.post('/ruta-admin', verifyToken, checkRolAdmin, handler)

const normalize = (v) => {
  if (v === undefined || v === null) return '';
  return String(v).trim().toLowerCase();
};

const permit = (...allowedRoles) => {
  const allowed = allowedRoles.map(normalize);
  return (req, res, next) => {
    // Buscar el tipo de usuario en varios lugares posibles
    const raw =
      req.user?.tipoUsuario ??
      req.user?.tipoUsuarioId ??
      req.tipoUsuario ??
      req.body?.tipoUsuario ??
      req.headers['x-rol'] ; // opcional: cabecera de prueba

    if (!raw) {
      return res.status(401).json({ error: 'Usuario no autenticado o token inválido' });
    }

    const value = normalize(raw);

    // Si allowed contiene números como strings ('1','2') también funcionará
    if (allowed.includes(value)) return next();

    return res.status(403).json({
      error: `Acceso denegado, rol requerido: ${allowedRoles.join(' o ')}`
    });
  };
};

// Middlewares listos para usar (ajusta nombres/ids según tu DB)
const checkRolSoporte = permit('Soporte', 'soporte', '2'); // '2' por si usas id numérico para Soporte
const checkRolAdmin = permit('Admin', 'admin', 'Soporte', 'soporte', '1', '2'); // ejemplo: permite Admin o Soporte

module.exports = { checkRolSoporte, checkRolAdmin, permit };
