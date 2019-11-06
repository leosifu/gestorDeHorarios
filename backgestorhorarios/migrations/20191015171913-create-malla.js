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
      res_malla: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre_malla: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_resolucion:{
        type: Sequelize.DATE,
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
