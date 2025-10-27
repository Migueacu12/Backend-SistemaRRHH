// controllers/DefaultController.js
// Devuelve un controlador básico para un modelo Sequelize pasado.
// modelo: el modelo Sequelize (o cualquier objeto con métodos findAll/ findByPk / create / update / destroy)
exports.defaultController = (modelo, idField = 'id', nombre = 'registro', name = 'entity', fk_emp = name) => {
  return {
    getAll: async (req, res) => {
      try {
        const items = await modelo.findAll();
        return res.json({ ok: true, data: items });
      } catch (err) {
        console.error('DefaultController.getAll error:', err);
        return res.status(500).json({ ok: false, message: 'Error interno' });
      }
    },

    getOne: async (req, res) => {
      try {
        const pk = req.params[idField] || req.params.id;
        const item = await modelo.findByPk(pk);
        if (!item) return res.status(404).json({ ok: false, message: `${nombre} no encontrado` });
        return res.json({ ok: true, data: item });
      } catch (err) {
        console.error('DefaultController.getOne error:', err);
        return res.status(500).json({ ok: false, message: 'Error interno' });
      }
    },

    getTableData: async (req, res) => {
      try {
        // Implementa la lógica específica para "table-data" si la necesitas.
        const items = await modelo.findAll();
        return res.json({ ok: true, data: items });
      } catch (err) {
        console.error('DefaultController.getTableData error:', err);
        return res.status(500).json({ ok: false, message: 'Error interno' });
      }
    },

    create: async (req, res) => {
      try {
        const nuevo = await modelo.create(req.body);
        return res.status(201).json({ ok: true, data: nuevo });
      } catch (err) {
        console.error('DefaultController.create error:', err);
        return res.status(500).json({ ok: false, message: 'Error interno' });
      }
    },

    update: async (req, res) => {
      try {
        const pk = req.params[idField] || req.params.id;
        const [updated] = await modelo.update(req.body, { where: { [idField]: pk } });
        if (!updated) return res.status(404).json({ ok: false, message: `${nombre} no encontrado` });
        return res.json({ ok: true, message: `${nombre} actualizado` });
      } catch (err) {
        console.error('DefaultController.update error:', err);
        return res.status(500).json({ ok: false, message: 'Error interno' });
      }
    },

    delete: async (req, res) => {
      try {
        const pk = req.params[idField] || req.params.id;
        const deleted = await modelo.destroy({ where: { [idField]: pk } });
        if (!deleted) return res.status(404).json({ ok: false, message: `${nombre} no encontrado` });
        return res.json({ ok: true, message: `${nombre} eliminado` });
      } catch (err) {
        console.error('DefaultController.delete error:', err);
        return res.status(500).json({ ok: false, message: 'Error interno' });
      }
    }
  };
};
