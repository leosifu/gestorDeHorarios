'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coordinacion = sequelize.define('Coordinacion', {
    tipo_coord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_bloques: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Coordinacion.associate = function(models) {
    // associations can be defined here
    Coordinacion.belongsToMany(models.Asignatura,{
      through: models.InfoCoordinacion,
      foreignKey: 'coordinacionId',
      as: 'asignaturas'
    })
    Coordinacion.belongsToMany(models.Usuario,{
      through: models.Asignacion,
      foreignKey: 'coordinacionId',
      as: 'profesores'
    })
    Coordinacion.hasMany(models.Bloque,{
      foreignKey: 'coordinacionId',
      as:'bloques'
    })
  };
  return Coordinacion;
};
