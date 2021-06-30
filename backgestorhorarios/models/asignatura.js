'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asignatura = sequelize.define('Asignatura', {
    tel_T: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tel_E: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tel_L: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Asignatura.associate = function(models) {
    // associations can be defined here
    Asignatura.belongsToMany(models.NewCarrera,{
      through: models.InfoAsignatura,
      foreignKey: 'asignaturaId',
      as: 'carreras'
    })
    /*Asignatura.hasMany(models.Coordinacion,{
      foreignKey: 'asignaturaId',
      as:'coordinaciones'
    })*/
    Asignatura.belongsToMany(models.Coordinacion,{
      through: models.InfoCoordinacion,
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
