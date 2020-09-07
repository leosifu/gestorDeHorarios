'use strict';
module.exports = (sequelize, DataTypes) => {
  const Malla = sequelize.define('Malla', {
    cod_malla: {
      type:DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    fecha_resolucion:{
      type:DataTypes.DATE,
      allowNull: false,
    },
    n_niveles: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Malla.associate = function(models) {
    // associations can be defined here
    Malla.belongsTo(models.Carrera,{
      foreignKey: 'carreraId',
      onDelete:'CASCADE',
    })
    Malla.belongsTo(models.Proceso,{
      foreignKey: 'procesoId',
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
