'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Mallas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_malla: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_resolucion:{
        type: Sequelize.DATE,
      },
      cod_resolucion: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('Mallas');
  }
};
