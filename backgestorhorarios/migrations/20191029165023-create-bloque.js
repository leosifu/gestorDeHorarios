'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bloques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      num_bloque: {
        type: Sequelize.INTEGER
      },
      sala: {
        type: Sequelize.STRING
      },
      asignado: {
        type: Sequelize.BOOLEAN
      },
      num_asociacion:{
        type: Sequelize.INTEGER
      },
      num_orden_bloque:{
        type: Sequelize.INTEGER
      },
      coordinacionId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('Bloques');
  }
};
