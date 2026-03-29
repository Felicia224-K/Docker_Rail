require('dotenv').config();
const express = require('express');
const sensorRoutes = require('./routes/sensorRoutes');
const { rateLimiter } = require('./middleware/rateLimiter');
require('./config/pubsub');

const app = express();
app.use(express.json());
app.use('/api/sensors', sensorRoutes);
app.use(rateLimiter(100, 60));

app.get('/', (req, res) => {
  res.json({ message: 'IoT Sensors API is running!' });
});

app.post('/login', rateLimiter(5, 60), (req, res) => {
  res.json({ message: 'Login route protegee' });
});

module.exports = app;