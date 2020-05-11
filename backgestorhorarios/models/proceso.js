'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proceso = sequelize.define('Proceso', {
    año: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    añoSemestre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['active', 'creating', 'finished'],
      allowNull: false,
      default: 'creating'
    }
  }, {});
  Proceso.associate = function(models) {
    // associations can be defined here
    Proceso.hasMany(models.Malla,{
      foreignKey: 'procesoId',
      as:'procesos'
    })
    Proceso.belongsToMany(models.Usuario,{
      through: models.UsuarioProceso,
      foreignKey: 'procesoId',
      as: 'procesosU'
    })
  };
  return Proceso;
};
