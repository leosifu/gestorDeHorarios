'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewCarrera = sequelize.define('NewCarrera', {
    nombre: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    jornada: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    año: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    n_niveles: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  NewCarrera.associate = function(models) {
    // associations can be defined here
    NewCarrera.belongsTo(models.Proceso,{
      foreignKey: 'procesoId',
      onDelete:'CASCADE',
    })
    NewCarrera.belongsToMany(models.Asignatura,{
      through: models.InfoAsignatura,
      foreignKey: 'carreraId',
      as: 'asignaturas'
    })
  };
  return NewCarrera;
};
