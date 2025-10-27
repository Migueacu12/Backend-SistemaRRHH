const db = require('../config/db');

// helper promisified query
function q(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

const Usuario = {
  // obtener todos los usuarios (callback)
  getAll(callback) {
    db.query('SELECT id, nombre, email, rol FROM usuarios', (err, results) => {
      callback(err, results);
    });
  },

  // obtener un usuario por id (callback)
  getById(id, callback) {
    db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  // crear usuario (callback) OR Promise si no se pasa callback
  create(data, callback) {
    const sql = 'INSERT INTO usuarios (nombre, email, password, rol, tipoUsuarioId) VALUES (?, ?, ?, ?, ?)';
    const params = [data.nombre, data.email, data.password, data.rol || null, data.tipoUsuarioId || null];

    if (typeof callback === 'function') {
      db.query(sql, params, (err, result) => {
        callback(err, result);
      });
      return;
    }

    // Promise-style (compatible con async/await)
    return q(sql, params).then(result => {
      // devolver un objeto similar a lo que esperaría el controlador
      return {
        id: result.insertId,
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        rol: data.rol || null,
        tipoUsuarioId: data.tipoUsuarioId || null
      };
    });
  },

  // eliminar usuario (callback)
  delete(id, callback) {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
      callback(err, result);
    });
  },

  // actualizar usuario (sin password) (callback)
  update(id, data, callback) {
    const sql = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?';
    db.query(sql, [data.nombre, data.email, data.rol, id], (err, result) => {
      callback(err, result);
    });
  },

  // Método compatible tipo-Sequelize: findOne({ where: { email } })
  // Devuelve una Promise que resuelve en el objeto usuario o null
  async findOne(query) {
    try {
      if (!query || !query.where) return null;
      if (query.where.email) {
        const rows = await q('SELECT id, nombre, email, password, rol, tipoUsuarioId FROM usuarios WHERE email = ? LIMIT 1', [query.where.email]);
        if (!rows || rows.length === 0) return null;
        // devolver la fila como objeto (mimic Sequelize instance minimal)
        return rows[0];
      }
      // Soporte para búsquedas por id
      if (query.where.id) {
        const rows = await q('SELECT id, nombre, email, password, rol, tipoUsuarioId FROM usuarios WHERE id = ? LIMIT 1', [query.where.id]);
        return rows.length ? rows[0] : null;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Usuario;
