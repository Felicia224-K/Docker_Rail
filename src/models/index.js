'use strict';
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);


const User = require('./user') (sequelize);
const Sensor = require('./sensor') (sequelize);
const Tag = require('./tag') (sequelize);


User.hasMany(Sensor, {
    foreignKey: 'userId', 
    onDelete: 'CASCADE'
});

Sensor.belongsTo(User, {
    foreignKey: 'userId'
});



Sensor.belongsToMany( Tag, {
    through: 'sensor_tags', 
    foreignKey: 'sensorId',
    as: 'tags',
    timestamps: false
});


Tag.belongsToMany(Sensor, {
    through: 'sensor_tags', 
    foreignKey: 'sensorId',
    as: 'sensors',
    timestamps: false
});



module.exports ={ sequelize, User, Sensor, Tag};