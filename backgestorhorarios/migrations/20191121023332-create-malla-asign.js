'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MallaAsigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_asignatura:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nivel:{
        type: Sequelize.INTEGER,
      },
      mallaId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Mallas',
          key: 'id',
          as: 'mallaId'
        }
      },
      asignaturaId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Asignaturas',
          key: 'id',
          as: 'asignaturaId'
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
    return queryInterface.dropTable('MallaAsigns');
  }
};
