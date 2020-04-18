'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolUsuario = sequelize.define('RolUsuario', {
    rolId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  }, {});
  RolUsuario.associate = function(models) {
    // associations can be defined here
    RolUsuario.belongsTo(models.Rol,{
      foreignKey: 'rolId'
    })
    RolUsuario.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId'
    })
  };
  return RolUsuario;
};
