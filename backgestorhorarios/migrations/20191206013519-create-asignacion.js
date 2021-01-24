'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Asignacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      coordinacionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Coordinacions',
          key: 'id',
          as: 'coordinacionId'
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
    return queryInterface.dropTable('Asignacions');
  }
};
