'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coordinacion = sequelize.define('Coordinacion', {
    tipo_coord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Coordinacion.associate = function(models) {
    // associations can be defined here
    Coordinacion.belongsToMany(models.Asignatura,{
      through: models.InfoCoordinacion,
      foreignKey: 'coordinacionId',
      as: 'asignaturas'
    })
    Coordinacion.hasMany(models.Bloque,{
      foreignKey: 'coordinacionId',
      as:'bloques'
    })
  };
  return Coordinacion;
};
