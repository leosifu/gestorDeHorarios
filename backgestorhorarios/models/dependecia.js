'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dependecia = sequelize.define('Dependecia', {

  }, {});
  Dependecia.associate = function(models) {
    // associations can be defined here
    Dependecia.belongsTo(models.Asignatura,{
      as: 'requisito',
      onDelete: 'CASCADE'
    })
    Dependecia.belongsTo(models.Asignatura,{
      as: 'asignatura',
      onDelete: 'CASCADE'
    })
  };
  return Dependecia;
};
