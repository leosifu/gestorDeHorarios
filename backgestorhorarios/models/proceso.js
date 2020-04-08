'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proceso = sequelize.define('Proceso', {
    año: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: false
    }
  }, {});
  Proceso.associate = function(models) {
    // associations can be defined here
    Proceso.hasMany(models.Malla,{
      foreignKey: 'procesoId',
      as:'procesos'
    })
  };
  return Proceso;
};
