'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
         type          : Sequelize.INTEGER, 
        autoIncrement : true, 
        primaryKey    : true
      },

      name: { 
        type      : Sequelize.STRING(50), 
        allowNull : false
      }, 

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },

      password : {
        type: Sequelize.STRING,
        allowNull: false
      },



      createdAt : {
        type: Sequelize.DATE, 
        allowNull: false 
      }, 


      updatedAt : { 
        type: Sequelize.DATE,
        allowNull: false 
      },

    }); 
 
    
    await queryInterface.addIndex('users', ['email']);  
  },

  

  async down (queryInterface) {
    await queryInterface.dropTable('users');
    
  }
};
