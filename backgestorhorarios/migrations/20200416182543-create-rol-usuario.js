'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RolUsuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Rols',
          key: 'id',
          as: 'rolId'
        }
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Usuarios',
          key: 'id',
          as: 'usuarioId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RolUsuarios');
  }
};
