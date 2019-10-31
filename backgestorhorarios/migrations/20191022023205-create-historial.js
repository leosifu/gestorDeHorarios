'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Historials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cupos_pasados: {
        type: Sequelize.INTEGER
      },
      tasa_reprobacion: {
        type: Sequelize.INTEGER
      },
      cupos_estimados: {
        type: Sequelize.INTEGER
      },
      tasa_reprobacion_pre: {
        type: Sequelize.INTEGER
      },
      asignaturaId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Asignatura',
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
    return queryInterface.dropTable('Historials');
  }
};
