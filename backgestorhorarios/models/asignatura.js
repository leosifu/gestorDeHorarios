'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asignatura = sequelize.define('Asignatura', {
    nombre_asignatura:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel_T: DataTypes.INTEGER,
    tel_E: DataTypes.INTEGER,
    tel_L: DataTypes.INTEGER,
    lab_independiente:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {});
  Asignatura.associate = function(models) {
    // associations can be defined here
    Asignatura.belongsToMany(models.Malla,{
      through: models.MallaAsign,
      foreignKey: 'asignaturaId',
      as: 'mallas'
    })
    /*Asignatura.hasMany(models.Coordinacion,{
      foreignKey: 'asignaturaId',
      as:'coordinaciones'
    })*/
    Asignatura.belongsToMany(models.Coordinacion,{
      through: models.AsignCoord,
      foreignKey: 'asignaturaId',
      as: 'coordinaciones',
    })
    Asignatura.hasOne(models.Historial,{
      foreignKey:'asignaturaId',
      as: 'historial'
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
