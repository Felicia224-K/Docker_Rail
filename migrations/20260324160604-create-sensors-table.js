'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sensors', {
      id: {
        type          : Sequelize.INTEGER, 
        autoIncrement : true, 
        primaryKey    : true
      }, 

      name: { 
        type      : Sequelize.STRING(50), 
        allowNull : false, 
      }, 

      type: { 
        type  : Sequelize.ENUM('temperature','humidity','light','pressure'), 
        allowNull    : false, 
      }, 

      value    : { type: Sequelize.FLOAT,      defaultValue: 0 }, 
      unit     : { type: Sequelize.STRING(10), defaultValue: '' }, 
      isActive : { type: Sequelize.BOOLEAN,    defaultValue: true },

     userId: { 
        type       : Sequelize.INTEGER, 
        allowNull  : false, 
        references : { model: 'users', key: 'id' },  
        onDelete   : 'CASCADE',   
      }, 

      
      createdAt : { type: Sequelize.DATE, allowNull: false }, 
      updatedAt : { type: Sequelize.DATE, allowNull: false }, 
    }); 
 
    
    await queryInterface.addIndex('sensors', ['userId']); 
    await queryInterface.addIndex('sensors', ['type']); 
  },



  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sensors');
    
  },
};
