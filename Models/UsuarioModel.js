const db = require('../config/db');

const Usuario = {
  // obtener todos los usuarios
  getAll(callback) {
    db.query('SELECT id, nombre, email, rol FROM usuarios', (err, results) => {
      callback(err, results);
    });
  },

  // obtener un usuario por id
  getById(id, callback) {
    db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  // crear usuario (password ya debe venir hasheado desde el controlador)
  create(data, callback) {
    const sql = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
    db.query(sql, [data.nombre, data.email, data.password, data.rol], (err, result) => {
      callback(err, result);
    });
  },

  // eliminar usuario
  delete(id, callback) {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
      callback(err, result);
    });
  },

  // actualizar usuario (sin password)
  update(id, data, callback) {
    const sql = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?';
    db.query(sql, [data.nombre, data.email, data.rol, id], (err, result) => {
      callback(err, result);
    });
  }
};

module.exports = Usuario;