'use strict';

const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

const { withCache, invalidateCache } = require('../middleware/cache');




router.get('/',      withCache(60),  sensorController.getAllSensors);
router.get('/stats',  withCache(60),   sensorController.getStatsByType);
router.get('/:id',     withCache(60),  sensorController.getSensorWithTags);
       
 
router.post('/',       async (req, res, next) => {
  await invalidateCache(req.user?.id);
  next();
}, sensorController.createSensorWithTags);

router.delete('/:id',  async (req, res, next) => {
  await invalidateCache(req.user?.id);
  next();
}, sensorController.deleteSensor);


module.exports = router;