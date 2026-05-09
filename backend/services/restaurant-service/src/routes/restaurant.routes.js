const router = require("express").Router();
const {getAll,getById} = require('../controllers/restaurant.controller')
const { cacheJson } = require("../middleware/cache");

const ttlSeconds = Number(process.env.RESTAURANT_CACHE_TTL_SECONDS || 60);

router.get(
  "/",
  cacheJson({
    ttlSeconds,
    key: (req) => `restaurant-service:restaurants:all`,
  }),
  getAll
);

router.get(
  "/:id",
  cacheJson({
    ttlSeconds,
    key: (req) => `restaurant-service:restaurants:menu:${req.params.id}`,
  }),
  getById
);

module.exports = router;