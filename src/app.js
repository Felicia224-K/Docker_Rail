require('dotenv').config();
const express = require('express');
const promClient = require('prom-client');
const sensorRoutes = require('./routes/sensorRoutes');
const { rateLimiter } = require('./middleware/rateLimiter');
require('./config/pubsub');

const app = express();

promClient.collectDefaultMetrics();
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const httpDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  buckets: [0.001, 0.1, 0.05, 0.1, 0.5, 1, 2, ],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer();
    res.on('finish', () => {
        httpRequestsTotal.inc({ 
            method: req.method, 
            route: req.path?.path || req.path,
            status : res.statusCode 
        });
        end({ method: req.method, route: req.route?.path || req.path });
    });
        next();
});

app.use(express.json());
app.use('/api/sensors', sensorRoutes);
app.use(rateLimiter(100, 60));

app.get('/', (req, res) => {
  res.json({ message: 'IoT Sensors API is running!' });
});

app.post('/login', rateLimiter(5, 60), (req, res) => {
  res.json({ message: 'Login route protegee' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

module.exports = app;