'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },

        color: {
            type: DataTypes.STRING(7),
            defaultValue: '#336791'
        }
    },  {
        tableName: 'tags'
    });
};