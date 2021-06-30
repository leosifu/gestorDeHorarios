'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NewCarreras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      jornada: {
        type: Sequelize.STRING
      },
      año: {
        type: Sequelize.STRING
      },
      n_niveles: {
        type: Sequelize.INTEGER,
      },
      carreraId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Carreras',
          key: 'id',
          as: 'carreraId'
        }
      },
      procesoId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Procesos',
          key: 'id',
          as: 'procesoId'
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
    return queryInterface.dropTable('NewCarreras');
  }
};
