const router = require("express").Router();
const {getAll,getById} = require('../controllers/restaurant.controller')

router.get('/',getAll)
router.get('/:id',getById)

module.exports = router;