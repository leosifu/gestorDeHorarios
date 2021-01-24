'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asignacion = sequelize.define('Asignacion', {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coordinacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Asignacion.associate = function(models) {
    // associations can be defined here
    Asignacion.belongsTo(models.Coordinacion,{
      foreignKey: 'coordinacionId',
      as: 'profesores'
    })
    Asignacion.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      as: 'coordinaciones'
    })
  };
  return Asignacion;
};
