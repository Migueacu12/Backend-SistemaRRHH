module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define('Tarea', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    estado: {
      type: DataTypes.ENUM('pendiente', 'en progreso', 'terminada'),
      allowNull: false,
      defaultValue: 'pendiente',
    },
    fechaLimite: DataTypes.DATE,
    creadoPor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asignadoA: DataTypes.INTEGER,
  });
  return Tarea;
};