'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profesor = sequelize.define('Profesor', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    rut: DataTypes.INTEGER
  }, {});
  Profesor.associate = function(models) {
    // associations can be defined here
    Profesor.belongsToMany(models.Coordinacion,{
      through: models.Asignacion,
      foreignKey: 'profesorId',
      as: 'profesores'
    })
  };
  return Profesor;
};
