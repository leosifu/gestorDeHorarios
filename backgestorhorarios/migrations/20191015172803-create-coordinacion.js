'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Coordinacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_coord: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_coord: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre_coord:{
        type: Sequelize.STRING,
        allowNull: false,
      }
      num_asociacion:{
        type: Sequelize.INTEGER
      },
      asignaturaId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('Coordinacions');
  }
};
