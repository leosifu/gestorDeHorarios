'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dependencia = sequelize.define('Dependencia', {

  }, {});
  Dependencia.associate = function(models) {
    // associations can be defined here
    Dependencia.belongsTo(models.Asignatura,{
      as: 'requisito',
      onDelete: 'CASCADE'
    })
    Dependencia.belongsTo(models.Asignatura,{
      as: 'asignatura',
      onDelete: 'CASCADE'
    })
  };
  return Dependencia;
};
