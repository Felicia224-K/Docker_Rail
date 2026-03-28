require('dotenv').config();
const express = require('express');
const {sequelize} = require('./models');
const sensorRoutes = require('./routes/sensorRoutes');

const authRoutes = require('./routes/authRoutes');

const {rateLimiter} = require('./middleware/rateLimiter');



require('./config/pubsub');


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/sensors', sensorRoutes);

app.use(rateLimiter(100, 60));




app.get('/', (req, res) => {
  res.json({ message: 'IoT Sensors API is running!' });
});

app.post('/login', rateLimiter(5, 60), (req, res) => {
  res.json({ message: 'Login route protegee' });
});

const PORT = process.env.PORT || 3000;
sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => 
            console.log(`Server running at http://localhost:${PORT}`)
        );
    })
.catch(err => console.error('Database connection error:', err));

module.exports = app;