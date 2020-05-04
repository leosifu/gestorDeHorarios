'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsuarioProceso = sequelize.define('UsuarioProceso', {
    procesoId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  }, {});
  UsuarioProceso.associate = function(models) {
    // associations can be defined here
    UsuarioProceso.belongsTo(models.Proceso,{
      foreignKey: 'procesoId'
    });
    UsuarioProceso.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId'
    })
  };
  return UsuarioProceso;
};
