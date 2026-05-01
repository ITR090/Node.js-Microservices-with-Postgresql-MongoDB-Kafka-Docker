const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    
    payment_details: {   // coming from payment service as topic message
        type: Object,
        required: true
    },
    orderStatus:{
        type: String,
        default: "Pending"
    },
  
},{
    //to create a timestamps for each rwo in table. 
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;