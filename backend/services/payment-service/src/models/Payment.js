const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({

    payment_method:{
        type: String,
        require:true,
    },
    payment_amount:{
        type: mongoose.Schema.Types.Double,
        required: true
    },
    cart_items: {
        type: Array,
        required: true
    }
},{
    //to create a timestamps for each rwo in table. 
    timestamps: true
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;