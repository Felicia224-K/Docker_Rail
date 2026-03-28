'use strict';
const {DataTypes } = require('sequelize');


module.exports =(sequelize) => {
    return sequelize.define('User', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
    },  {
        tableName: 'users'
    });
};