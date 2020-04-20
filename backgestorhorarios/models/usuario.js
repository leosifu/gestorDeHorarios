'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    rut: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsToMany(models.Coordinacion,{
      through: models.Asignacion,
      foreignKey: 'usuarioId',
      as: 'usuarios'
    })
    Usuario.belongsToMany(models.Rol,{
      through: models.RolUsuario,
      foreignKey: 'usuarioId',
      as: 'roles'
    })
  };
  return Usuario;
};
