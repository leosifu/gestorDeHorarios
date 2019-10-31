'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Asignaturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_asignatura: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre_asignatura: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel_T: {
        type: Sequelize.INTEGER
      },
      tel_E: {
        type: Sequelize.INTEGER
      },
      tel_L: {
        type: Sequelize.INTEGER
      },
      nivel:{
        type: Sequelize.INTEGER,
      },
      lab_independiente:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      mallaId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Mallas',
          key: 'id',
          as: 'mallaId'
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
    return queryInterface.dropTable('Asignaturas');
  }
};
