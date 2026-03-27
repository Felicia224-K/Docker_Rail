'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Assemien Audrey',
        email: 'audrey@gmail.com',
        password: 'pass123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mr Zampa',
        email: 'zampa@gmail.com',
        password: 'pass23',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Prince Diallo',
        email: 'prince@gmail.com.com',
        password: 'pass3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
