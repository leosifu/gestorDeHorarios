'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InfoCoordinacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      asignaturaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Asignaturas',
          key: 'id',
          as: 'asignaturaId'
        }
      },
      cod_coord: {
        type: Sequelize.STRING
      },
      nombre_coord: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('InfoCoordinacions');
  }
};
