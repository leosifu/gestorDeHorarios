'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    cod_carrera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_carrera: {
      type: DataTypes.STRING,
      allowNull: false,
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
