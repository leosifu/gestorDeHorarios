'use strict';
module.exports = (sequelize, DataTypes) => {
  const Historial = sequelize.define('Historial', {
    cupos_pasados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tasa_reprobacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cupos_estimados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    desinscripciones: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
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
