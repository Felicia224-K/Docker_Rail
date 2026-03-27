'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sensor_tags', { 
      sensorId : { 
        type       : Sequelize.INTEGER, 
        references : { model: 'sensors', key: 'id' }, 
        onDelete   : 'CASCADE', 
      }, 

      tagId : { 
        type       : Sequelize.INTEGER, 
        references : { model: 'tags', key: 'id' }, 
        onDelete   : 'CASCADE', 
      },

      createdAt: { 
        type: Sequelize.DATE, 
        allowNull: false 
      }, 

      updatedAt: { 
        type: Sequelize.DATE, 
        allowNull: false
      
      }, 

  });

  await queryInterface.addIndex('sensor_tags', ['sensorId']);
  await queryInterface.addIndex('sensor_tags', ['tagId']);
  },

  async down (queryInterface) {
   
    await queryInterface.dropTable('sensor_tags');
  }
  
};
