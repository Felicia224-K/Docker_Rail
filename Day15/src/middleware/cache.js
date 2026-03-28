const redis = require('../config/redis'); 
 
 
const cacheKey = (req) => `cache:${req.user?.id || 'guest'}:${req.path}`; 
 

const withCache = (ttlSeconds = 60) => async (req, res, next) => { 
  const key = cacheKey(req); 


  try { 
    const cached = await redis.get(key); 
    if (cached) { 
      return res.json({ ...JSON.parse(cached), fromCache: true }); 
    } 

  } catch (err) { 
    console.warn('Cache indisponible, fallback PostgreSQL'); 
  } 
 

  const originalJson = res.json.bind(res); 
  res.json = async (data) => { 
    try { 
      await redis.setex(key, ttlSeconds, JSON.stringify(data)); 
    } catch (err) { /* Redis optionnel */ } 
    return originalJson(data); 
  }; 
  next(); 
}; 


const invalidateCache = (userId) => { 
  return redis.del(`cache:${userId}:/sensors`); 
}; 

module.exports = {withCache, invalidateCache};
