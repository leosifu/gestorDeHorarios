'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsToMany(models.Coordinacion,{
      through: models.Asignacion,
      foreignKey: 'usuarioId',
      as: 'coordinaciones'
    })
    Usuario.belongsToMany(models.Rol,{
      through: models.RolUsuario,
      foreignKey: 'usuarioId',
      as: 'roles'
    })
    Usuario.belongsToMany(models.Proceso,{
      through: models.UsuarioProceso,
      foreignKey: 'usuarioId',
      as: 'profesores'
    })
  };
  return Usuario;
};
