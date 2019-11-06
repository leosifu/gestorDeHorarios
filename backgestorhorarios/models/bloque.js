'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bloque = sequelize.define('Bloque', {
    num_bloque: {
      type: DataTypes.INTEGER,
      defaultValue: -1,
    },
    sala: DataTypes.STRING,
    asignado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    num_asociacion:{
      type: DataTypes.INTEGER,
    },
    num_orden_bloque:{
      type: DataTypes.INTEGER,
    }
  }, {});
  Bloque.associate = function(models) {
    // associations can be defined here
    Bloque.belongsTo(models.Coordinacion,{
      foreignKey: 'coordinacionId',
      onDelete: 'CASCADE'
    })
  };
  return Bloque;
};
