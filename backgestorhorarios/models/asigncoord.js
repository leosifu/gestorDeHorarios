'use strict';
module.exports = (sequelize, DataTypes) => {
  const AsignCoord = sequelize.define('AsignCoord', {
    coordinacionId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    cod_coord: DataTypes.INTEGER,
    nombre_coord: DataTypes.STRING
  }, {});
  AsignCoord.associate = function(models) {
    // associations can be defined here
    AsignCoord.belongsTo(models.Asignatura,{
      foreignKey: 'asignaturaId'
    })
    AsignCoord.belongsTo(models.Coordinacion,{
      foreignKey: 'coordinacionId'
    })
  };
  return AsignCoord;
};
