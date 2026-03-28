'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tags', [
      { name: 'indoor',    color: '#3498db', createdAt: new Date(), updatedAt: new Date() },
      { name: 'outdoor',   color: '#2ecc71', createdAt: new Date(), updatedAt: new Date() },
      { name: 'critical',  color: '#e74c3c', createdAt: new Date(), updatedAt: new Date() },
      { name: 'low-power', color: '#f39c12', createdAt: new Date(), updatedAt: new Date() },
      { name: 'garage',    color: '#9b59b6', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};