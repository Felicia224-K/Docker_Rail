const Redis = require('ioredis'); 
 
const redis = new Redis({ 
  host     : process.env.REDIS_HOST || 'localhost' , 
  port     : parseInt(process.env.REDIS_PORT) || 6379, 
  password : process.env.REDIS_PASSWORD || undefined, 
  retryStrategy: (times) =>{
    if (times> 3) return null;
    return times * 500;
  } 
}); 
 
redis.on('connect', () => console.log('Redis connecte')); 
redis.on('error',   (err) => console.error('Redis erreur :', err.message)); 
 
module.exports = redis;