'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coordinacion = sequelize.define('Coordinacion', {
    cod_coord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_coord: DataTypes.STRING,
    num_asociacion:{
      type: DataTypes.STRING,
    }
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
