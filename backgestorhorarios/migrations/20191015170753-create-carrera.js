'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Carreras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_carrera: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jornada:{
        type: Sequelize.STRING
        allowNull: false,
      },
      carrera_activa: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      mostrar_carrera_prof: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      mostrar_carrera_alum: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    return queryInterface.dropTable('Carreras');
  }
};
