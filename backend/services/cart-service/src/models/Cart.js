const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({

    id:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true
    },
    is_available:{
        type: Boolean,
        required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    restaurant_id:{
        type: Number,
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    }
},{
    //to create a timestamps for each rwo in table. 
    timestamps: true
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;