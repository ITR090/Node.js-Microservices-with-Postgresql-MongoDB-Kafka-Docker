const { getRedisClient } = require("../redis");

function defaultKey(req) {
  const queryPart =
    req.query && Object.keys(req.query).length
      ? `?${new URLSearchParams(req.query).toString()}`
      : "";
      console.log('queryPart', queryPart);
  return `${req.method}:${req.originalUrl}${queryPart}`;
}

/**
 * Cache JSON responses for successful (2xx) requests.
 * If Redis is down, it falls back to normal execution.
 */
function cacheJson({ ttlSeconds = 60 , key =defaultKey } = {}) {
  return async function cacheMiddleware(req, res, next) {
    let redis;
    let cacheKey;

    try {
      cacheKey = typeof key === "function" ? key(req) : String(key);
      res.setHeader("X-Cache-Key", cacheKey);
      redis = await getRedisClient();
      
      const hit = await redis.get(cacheKey);
      //console.log('hit', hit);
      if (hit) {
        // Ensure cached keys always have an expiry (helps when old keys were created without TTL).
        try {
          const ttl = await redis.ttl(cacheKey);
          if (ttl === -1) {
            await redis.expire(cacheKey, ttlSeconds);
          }
        } catch (_) {
          // ignore ttl enforcement errors
        }

        const parsed = JSON.parse(hit);
        res.setHeader("X-Cache", "HIT");
        return res.status(200).json(parsed);
      }
      res.setHeader("X-Cache", "MISS");
    } catch (e) {
      res.setHeader("X-Cache", "BYPASS");
      return next();
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      try {
        const status = res.statusCode || 200;
        if (status >= 200 && status < 300) {
          const payload = JSON.stringify(body);
          redis
            .setEx(cacheKey, ttlSeconds, payload)
            .catch(() => undefined);
        }
      } catch (_) {
        // ignore caching errors
      }
      return originalJson(body);
    };

    return next();
  };
}


function cacheData () {}

module.exports = { cacheJson };

