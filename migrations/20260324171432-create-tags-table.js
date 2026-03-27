'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        // Migration : create-tags-table 
    await queryInterface.createTable('tags', { 
          id    : {
            type: Sequelize.INTEGER,
            autoIncrement: true, primaryKey: true 
          },
          
          
          name  : { 
            type: Sequelize.STRING(30), 
            allowNull: false, 
            unique: true
           }, 


          color : { type: Sequelize.STRING(7),
             defaultValue: '#336791' 
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
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('tags');
  }
};
