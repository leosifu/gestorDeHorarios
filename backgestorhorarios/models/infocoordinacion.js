'use strict';
module.exports = (sequelize, DataTypes) => {
  const InfoCoordinacion = sequelize.define('InfoCoordinacion', {
    infoC_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    coordinacionId: {
      type: DataTypes.INTEGER,
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
    },
    cod_coord: {
      type: DataTypes.STRING,
    },
    nombre_coord: {
      type: DataTypes.STRING,
    },
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
