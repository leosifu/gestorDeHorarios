'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asignatura = sequelize.define('Asignatura', {
    cod_asignatura:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_asignatura:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel_T: DataTypes.INTEGER,
    tel_E: DataTypes.INTEGER,
    tel_L: DataTypes.INTEGER
  }, {});
  Asignatura.associate = function(models) {
    // associations can be defined here
    Asignatura.belongsTo(models.Malla,{
      foreignKey: 'mallaId',
      onDelete: 'CASCADE'
    })
    Asignatura.hasMany(models.Coordinacion,{
      foreignKey: 'asignaturaId',
      as:'coordinacions'
    })
  };
  return Asignatura;
};
