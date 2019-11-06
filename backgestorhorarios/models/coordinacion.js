'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coordinacion = sequelize.define('Coordinacion', {
    cod_coord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_coord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_coord:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Coordinacion.associate = function(models) {
    // associations can be defined here
    Coordinacion.belongsTo(models.Asignatura,{
      foreignKey: 'asignaturaId',
      onDelete:'CASCADE'
    })
    Coordinacion.hasMany(models.Bloque,{
      foreignKey: 'coordinacionId',
      as:'bloques'
    })
  };
  return Coordinacion;
};
