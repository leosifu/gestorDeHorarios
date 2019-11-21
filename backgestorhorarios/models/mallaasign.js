'use strict';
module.exports = (sequelize, DataTypes) => {
  const MallaAsign = sequelize.define('MallaAsign', {
    mallaId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
    },
    cod_asignatura:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex',
    },
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  MallaAsign.associate = function(models) {
    // associations can be defined here
    MallaAsign.belongsTo(models.Malla,{
      foreignKey: 'mallaId'
    })
    MallaAsign.belongsTo(models.Asignatura,{
      foreignKey: 'asignaturaId'
    })
  };
  return MallaAsign;
};
