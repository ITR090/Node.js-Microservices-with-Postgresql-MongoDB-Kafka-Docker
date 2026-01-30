const router = require("express").Router();
const {createPayment} = require('../controllers/payment.controller')

router.post('/create',createPayment)

module.exports = router;