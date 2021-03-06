'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Rol.associate = function(models) {
    // associations can be defined here
    Rol.belongsToMany(models.Usuario,{
      through: models.RolUsuario,
      foreignKey: 'rolId',
      as: 'usuarios'
    })
  };
  return Rol;
};
