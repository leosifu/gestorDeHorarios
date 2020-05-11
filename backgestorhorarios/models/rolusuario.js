'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolUsuario = sequelize.define('RolUsuario', {
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
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
