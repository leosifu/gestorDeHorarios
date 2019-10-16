'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coordinacion = sequelize.define('Coordinacion', {
    cod_coord: DataTypes.STRING,
    tipo_coord: DataTypes.STRING
  }, {});
  Coordinacion.associate = function(models) {
    // associations can be defined here
    Coordinacion.belongsTo(models.Asignatura,{
      foreignKey: 'asignaturaId',
      onDelete:'CASCADE'
    })
  };
  return Coordinacion;
};
