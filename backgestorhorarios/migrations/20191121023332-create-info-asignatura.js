'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InfoAsignaturas', {
      infoA_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
      },
      cod_asignatura:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nombre_asignatura: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nivel:{
        type: Sequelize.INTEGER,
      },
      carreraId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'NewCarreras',
          key: 'id',
          as: 'carreraId'
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
    return queryInterface.dropTable('InfoAsignaturas');
  }
};
