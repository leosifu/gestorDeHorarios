'use strict';
module.exports = (sequelize, DataTypes) => {
  const InfoAsignatura = sequelize.define('InfoAsignatura', {
    infoA_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    mallaId: {
      type: DataTypes.INTEGER,
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
    },
    cod_asignatura:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre_asignatura:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  InfoAsignatura.associate = function(models) {
    // associations can be defined here
    InfoAsignatura.belongsTo(models.Malla,{
      foreignKey: 'mallaId'
    })
    InfoAsignatura.belongsTo(models.Asignatura,{
      foreignKey: 'asignaturaId'
    })
  };
  return InfoAsignatura;
};
