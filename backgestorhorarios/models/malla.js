'use strict';
module.exports = (sequelize, DataTypes) => {
  const Malla = sequelize.define('Malla', {
    res_malla: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    nombre_malla: {
      type:DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    fecha_resolucion:{
      type:DataTypes.DATE,
    },
    n_niveles: {
      type: DataTypes.INTEGER,
    },
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    año: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: true,
    }
  }, {});
  Malla.associate = function(models) {
    // associations can be defined here
    Malla.belongsTo(models.Carrera,{
      foreignKey: 'carreraId',
      onDelete:'CASCADE',
    })
    Malla.belongsToMany(models.Asignatura,{
      through: models.InfoAsignatura,
      foreignKey: 'mallaId',
      as: 'asignaturas'
    })
  };
  return Malla;
};
