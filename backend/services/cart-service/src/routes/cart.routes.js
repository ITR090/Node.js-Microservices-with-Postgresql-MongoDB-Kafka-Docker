const router = require("express").Router();
const {addToCart,getCartItems,removeFromCart, clearCart} = require('../controllers/cart.controller')

router.get('/',getCartItems)
router.post('/add',addToCart)
router.post('/remove',removeFromCart)
router.post('/clear-cart',clearCart)


module.exports = router;