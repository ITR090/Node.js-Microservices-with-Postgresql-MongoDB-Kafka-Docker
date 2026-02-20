const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    
    id:{
        type: Number,
        required: true
    },
    topicMessage: {
        type: String,
        required: true
    },
    orderStatus:{
        type: String,
        default: "pending"
    }    
},{
    //to create a timestamps for each rwo in table. 
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;