'use strict';
const { Sensor, Tag, User, sequelize } = require('../models');
const { Op } = require('sequelize');

// GET /sensors — all sensors with their tags
exports.getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensor.findAll({
      include: [
        { model: Tag, as: 'tags', through: { attributes: [] } },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSensorWithTags = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id, {
      include: [
        { model: Tag, as: 'tags', through: { attributes: [] } },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!sensor) return res.status(404).json({ error: 'Sensor not found' });

    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getStatsByType = async (req, res) => {
  try {
    const stats = await Sensor.findAll({
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('id')),   'total'],
        [sequelize.fn('AVG',   sequelize.col('value')), 'moyenne'],
        [sequelize.fn('MAX',   sequelize.col('value')), 'maximum']
      ],
      group: ['type']
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createSensorWithTags = async (req, res) => {
  const { name, type, value, unit, userId, tagIds } = req.body;


  const t = await sequelize.transaction();
  try {
    // 1. Create the sensor
    const sensor = await Sensor.create(
      { name, type, value, unit, userId },
      { transaction: t }
    );

    // 2. Assign tags if provided
    if (tagIds && tagIds.length > 0) {
      await sensor.addTags(tagIds, { transaction: t });
    }

    // 3. All good — commit
    await t.commit();

    // 4. Return the sensor with its tags
    const result = await Sensor.findByPk(sensor.id, {
      include: [{ model: Tag, as: 'tags', through: { attributes: [] } }]
    });

    res.status(201).json(result);
  } catch (error) {
    // Something failed — rollback everything
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

// DELETE /sensors/:id
exports.deleteSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id);
    if (!sensor) return res.status(404).json({ error: 'Sensor not found' });

    await sensor.destroy();
    res.json({ message: 'Sensor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};