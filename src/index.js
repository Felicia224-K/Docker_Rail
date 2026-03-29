const server = require('./websocket');
const {sequelize} = require('./models');

const PORT = process.env.PORT || 3000;






sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return sequelize.sync({ alter: true }); 
    })
    .then(() => {
        console.log('Tables synced');
        app.listen(PORT,'0.0.0.0', () => 
            console.log(`Server running at http://localhost:${PORT}`)
        );
    })
    .catch(err => console.error('Database connection error:', err));