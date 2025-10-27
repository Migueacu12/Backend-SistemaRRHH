const Usuario = require('../Models/UsuarioModel');
const bcrypt = require('bcrypt'); // si lo instalas, para hashear password

// listar usuarios
exports.getUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
};

// obtener usuario por id
exports.getUsuarioById = (req, res) => {
  const id = req.params.id;
  Usuario.getById(id, (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuario' });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  });
};

// crear usuario (simple, con hash de password)
exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    const data = { nombre, email, password: hashed, rol };
    Usuario.create(data, (err, result) => {
      if (err) {
        console.error(err);
        // si clave UNIQUE falla, MySQL devuelve error; podrías detectar code === 'ER_DUP_ENTRY'
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'El email ya está registrado' });
        }
        return res.status(500).json({ error: 'Error al crear usuario' });
      }
      res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  }
};

// eliminar usuario
exports.deleteUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  });
};

// actualizar usuario (sin password)
exports.updateUsuario = (req, res) => {
  const id = req.params.id;
  const { nombre, email, rol } = req.body;
  const data = { nombre, email, rol };
  Usuario.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    res.json({ message: 'Usuario actualizado' });
  });
};
