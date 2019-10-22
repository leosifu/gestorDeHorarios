'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    cod_carrera: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre_carrera: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    jornada:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrera_activa:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    mostrar_carrera: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
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
