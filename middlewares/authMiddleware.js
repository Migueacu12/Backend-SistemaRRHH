const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  try {
    const payload = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secreto');
    req.usuario = payload; // Puedes acceder a los datos del usuario en las rutas protegidas
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
}

module.exports = verificarToken;