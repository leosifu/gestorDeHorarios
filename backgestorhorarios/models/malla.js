'use strict';
module.exports = (sequelize, DataTypes) => {
  const Malla = sequelize.define('Malla', {
    cod_malla: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre_malla: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_resolucion_malla:{
      type:DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    n_niveles: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Malla.associate = function(models) {
    // associations can be defined here
    Malla.belongsTo(models.Carrera,{
      foreignKey: 'carreraId',
      onDelete:'CASCADE',
    })
    Malla.hasMany(models.Asignatura,{
      foreignKey: 'mallaId',
      as: 'asignaturas'
    })
  };
  return Malla;
};
