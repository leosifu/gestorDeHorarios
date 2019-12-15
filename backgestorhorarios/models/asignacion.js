'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asignacion = sequelize.define('Asignacion', {
    profesorId: DataTypes.INTEGER,
    coordinacionId: DataTypes.INTEGER
  }, {});
  Asignacion.associate = function(models) {
    // associations can be defined here
    Asignacion.belongsTo(models.Coordinacion,{
      foreignKey: 'coordinacionId',
      as: 'profesores'
    })
    Asignacion.belongsTo(models.Profesor,{
      foreignKey: 'profesorId',
      as: 'coordinaciones'
    })
  };
  return Asignacion;
};
