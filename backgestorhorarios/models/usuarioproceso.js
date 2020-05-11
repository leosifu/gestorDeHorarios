'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsuarioProceso = sequelize.define('UsuarioProceso', {
    procesoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
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
