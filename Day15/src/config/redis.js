const Redis = require('ioredis'); 
 
redis = new Redis({ 
  host     : process.env.REDIS_HOST , 
  port     : parseInt(process.env.REDIS_PORT) || 6379, 
  password : process.env.REDIS_PASSWORD || undefined, 
  retryStrategy: (times) => Math.min(times * 100, 3000), 
}); 
 
redis.on('connect', () => console.log('Redis connecte')); 
redis.on('error',   (err) => console.error('Redis erreur :', err.message)); 
 
module.exports = redis;