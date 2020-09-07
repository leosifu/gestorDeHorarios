'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    nombre_carrera: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    jornada:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Carrera.associate = function(models) {
    // associations can be defined here
    Carrera.hasMany(models.Malla,{
      foreignKey: 'carreraId',
      as:'mallas'
    })
  };
  return Carrera;
};
