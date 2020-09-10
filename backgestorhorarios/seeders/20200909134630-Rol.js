'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    try {
      await queryInterface.bulkInsert('Usuarios', [{
        name: 'Graciela',
        lastName: 'Madrid',
        email: 'graciela.madrid@usach.cl',
        rut: '11.111.111-1',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Leonardo',
        lastName: 'Sifuentes',
        email: 'leonardo.sifuentes@usach.cl',
        rut: '11.111.111-2',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      await queryInterface.bulkInsert('Rols', [{
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        rol: 'profe',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        rol: 'coordinador',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      const users = await queryInterface.sequelize.query(
        'SELECT id from Usuarios;'
      );

      const roles = await queryInterface.sequelize.query(
        'SELECT id from Rols;'
      );

      await queryInterface.bulkInsert('RolUsuarios', [{
        usuarioId: users[0][0].id,
        rolId: roles[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        usuarioId: users[0][1].id,
        rolId: roles[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
      return;

    } catch (e) {
      console.log(e);
    }
  },

  down: async(queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('Usuarios', {null}, {});
    await queryInterface.bulkDelete('Rols', null, {});
    await queryInterface.bulkDelete('RolUsuarios', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
