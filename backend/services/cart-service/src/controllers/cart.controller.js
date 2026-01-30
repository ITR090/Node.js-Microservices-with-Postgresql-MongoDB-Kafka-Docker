
const Cart = require('../models/Cart.js')

exports.getCartItems = async (req, res) => {

    try {
        const response = await Cart.find({});
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching cart items', error.stack);
        res.status(500).json({message:'Error fetching cart items' , data: error});
    }
};

exports.addToCart = async (req, res) => {


    try {
        const { id, category, description, image_url, is_available, name, price, restaurant_id, quantity } = req.body;

        const isExists = await Cart.findOne({ id })
        if (isExists) {
            return res.status(400).json({ message: 'Already in cart' });
        } else {
            // 1. Create a new cart item
            const newCartItem = new Cart({
                id,
                category,
                description,
                image_url,
                is_available,
                name,
                price,
                restaurant_id,
                quantity:1
            });
            // 2. Save the cart item to the database
            const results = await newCartItem.save();
            if (results) {
                res.status(201).json({ message: 'Added successfully', cartItem: results });
            }
        }

    } catch (error) {
        console.error('Error adding to cart', error.stack);
        res.status(500).send('Error adding to cart.');
    }

};

exports.removeFromCart =  async (req, res) => {

    try {
        const { id } = req.body;
        const response = await Cart.findOneAndDelete({ id: id});
        if (response) {
            res.status(200).json({ message: 'Removed from cart', data: response });
        }
    } catch (error) {
        console.error('Error adding to cart', error.stack);
        res.status(500).json({message:'Error adding to cart' , data:error});
    }

};

exports.clearCart = async (req,res) =>{
    
    try {
        const response = await Cart.deleteMany({})
        if(response.acknowledged){
            res.status(200).json({ message: 'Cart cleard Successfully' });
        }  
    } catch (error) {
        console.error('Error adding to cart', error.stack);
    }
}

