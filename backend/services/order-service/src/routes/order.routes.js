const router = require("express").Router();
const {createOrder,getOrders} = require('../controllers/order.controller')

router.post('/create', createOrder)
router.get('/get-orders', getOrders)    
module.exports = router;
