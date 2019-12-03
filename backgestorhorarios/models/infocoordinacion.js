'use strict';
module.exports = (sequelize, DataTypes) => {
  const InfoCoordinacion = sequelize.define('InfoCoordinacion', {
    coordinacionId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    cod_coord: DataTypes.STRING,
    nombre_coord: DataTypes.STRING
  }, {});
  InfoCoordinacion.associate = function(models) {
    // associations can be defined here
    InfoCoordinacion.belongsTo(models.Asignatura,{
      foreignKey: 'asignaturaId'
    })
    InfoCoordinacion.belongsTo(models.Coordinacion,{
      foreignKey: 'coordinacionId'
    })
  };
  return InfoCoordinacion;
};
