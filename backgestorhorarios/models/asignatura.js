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
    tel_L: DataTypes.INTEGER,
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
    Asignatura.belongsToMany(models.Asignatura,{
      through: models.Dependencia,
      as: 'requisitos',
      foreignKey: 'asignaturaId'
    })
    Asignatura.belongsToMany(models.Asignatura,{
      through: models.Dependencia,
      as: 'asignaturas',
      foreignKey: 'requisitoId'
    })
  };
  return Asignatura;
};
