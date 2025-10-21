const { Tarea } = require('../models');

// Crear tarea
exports.crearTarea = async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar tareas
exports.listarTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar tarea
exports.editarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    await tarea.update(req.body);
    res.json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cambiar estado de tarea
exports.cambiarEstado = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    tarea.estado = req.body.estado;
    await tarea.save();
    res.json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    await tarea.destroy();
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
