'use strict';
module.exports = (sequelize, DataTypes) => {
  const Historial = sequelize.define('Historial', {
    cupos_pasados: DataTypes.INTEGER,
    tasa_reprobacion: DataTypes.INTEGER,
    cupos_estimados: DataTypes.INTEGER,
    tasa_reprobacion_pre: DataTypes.INTEGER,
    asignaturaId: DataTypes.INTEGER
  }, {});
  Historial.associate = function(models) {
    // associations can be defined here
    Historial.belongsTo(models.Asignatura,{
      foreignKey: 'asignaturaId',
      onDelete:'CASCADE'
    })
  };
  return Historial;
};
