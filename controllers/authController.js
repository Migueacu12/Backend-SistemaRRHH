// controllers/authController.js
const Usuario = require('../Models/UsuarioModel'); // ruta corregida
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'cambiar_por_un_secreto';

module.exports = {
  register: async (req, res) => {
    try {
      const { nombre, email, password, tipoUsuarioId } = req.body;
      if (!nombre || !email || !password || !tipoUsuarioId) {
        return res.status(400).json({ ok: false, message: 'Faltan campos requeridos' });
      }

      const existente = await Usuario.findOne({ where: { email } });
      if (existente) {
        return res.status(409).json({ ok: false, message: 'El email ya está en uso' });
      }

      const hashed = await bcrypt.hash(password, 10);
      const nuevo = await Usuario.create({
        nombre,
        email,
        password: hashed,
        tipoUsuarioId
      });

      return res.status(201).json({
        ok: true,
        message: 'Usuario creado',
        user: { id: nuevo.id, nombre: nuevo.nombre, email: nuevo.email }
      });
    } catch (err) {
      console.error('authController.register error:', err);
      return res.status(500).json({ ok: false, message: 'Error interno' });      
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ ok: false, message: 'Email y password requeridos' });

      const user = await Usuario.findOne({ where: { email } });
      if (!user) return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });

      const payload = { id: user.id, email: user.email, tipoUsuarioId: user.tipoUsuarioId };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '8h' });

      return res.json({
        ok: true,
        message: 'Autenticación correcta',
        token,
        user: { id: user.id, nombre: user.nombre, email: user.email, tipoUsuarioId: user.tipoUsuarioId }
      });
    } catch (err) {
      console.error('authController.login error:', err);
      return res.status(500).json({ ok: false, message: 'Error interno' });      
    }
  },

  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null; 
    if (!token) return res.status(401).json({ ok: false, message: 'Token requerido' });

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ ok: false, message: 'Token inválido' });
      req.user = decoded;
      next();
    });
  }
};
