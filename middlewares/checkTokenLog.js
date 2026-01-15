const jwt = require('jsonwebtoken');
const jwtSimple = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

/*
  Middleware compatible con:
   - tokens creados por authController (jsonwebtoken, header Authorization: Bearer <token>, secret = process.env.JWT_SECRET)
   - tokens antiguos que lleguen en header 'token-login' y fueron creados con jwt-simple y secret = process.env.PASSDECODE
  Se intenta primero decodificar token-login con jwt-simple (si existe). Si falla o no existe,
  se intenta Authorization Bearer con jsonwebtoken.
*/
const checkToken = (req, res, next) => {
  const tokenLogin = req.headers['token-login'];
  const authHeader = req.headers['authorization'] || '';

  if (!tokenLogin && !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Necesitas iniciar sesión para acceder a este contenido" });
  }

  // 1) Si llega token-login, intentamos decodificar con jwt-simple (mantener compatibilidad)
  if (tokenLogin) {
    try {
      const payload = jwtSimple.decode(tokenLogin, process.env.PASSDECODE);
      // Si el payload usa expiredAt (sistema antiguo), comprobarlo
      if (payload.expiredAt && payload.expiredAt < moment().unix()) {
        return res.status(408).json({ error: "El tiempo limite de uso en la pagina a caducado, por favor vuelva a iniciar sesión" });
      }

      // Mapear campos (compatibilidad con distintos nombres)
      req.idEmpleado = payload.idEmpleado || payload.id || payload.userId;
      req.tipoUsuario = payload.tipoUsuario || payload.tipoUsuarioId || payload.tipoUsuarioId;
      return next();
    } catch (err) {
      // Si falla la decodificación con jwt-simple, no cortamos: intentamos con Authorization Bearer abajo
    }
  }

  // 2) Intentamos Authorization: Bearer <token> (jsonwebtoken), usado por authController.login
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const tokenToVerify = bearerToken || tokenLogin || null;

  if (!tokenToVerify) {
    return res.status(401).json({ error: "Necesitas iniciar sesión para acceder a este contenido" });
  }

  try {
    const secret = process.env.JWT_SECRET || process.env.PASSDECODE;
    const decoded = jwt.verify(tokenToVerify, secret);

    // jwt.verify ya valida expiración (exp) si el token lo incluye
    req.idEmpleado = decoded.id || decoded.idEmpleado || decoded.userId;
    req.tipoUsuario = decoded.tipoUsuarioId || decoded.tipoUsuario;
    req.user = decoded; // opcional: dejar el payload completo disponible

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Necesitas iniciar sesión para acceder a este contenido" });
  }
};

module.exports = checkToken;