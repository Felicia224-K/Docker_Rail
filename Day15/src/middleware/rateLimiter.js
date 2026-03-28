const redis = require('../config/redis'); 
 
const rateLimiter = (maxRequests = 100, windowSeconds = 60) => { 
  return async (req, res, next) => { 
    
    const identifier = req.user?.id || req.ip; 
    const key        = `ratelimit:${identifier}:${req.path}`; 
 
    try { 
      
      const count = await redis.incr(key); 
 
       
      if (count === 1) { 
        await redis.expire(key, windowSeconds); 
      } 
 
      

      res.setHeader('X-RateLimit-Limit',     maxRequests); 
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - count)); 
 
      if (count > maxRequests) { 
        return res.status(429).json({ 
          success : false, 
          error   : `Trop de requetes. Reessayer dans ${windowSeconds} secondes.`, 
        }); 
      } 
      next();

       } catch (err) { 
      next(); 
    } 
  }; 
};

module.exports = {rateLimiter};