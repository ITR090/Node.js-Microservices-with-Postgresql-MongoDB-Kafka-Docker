const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({

    id:{
        type: Number,
        required: true
    }, 
    payment_method:{
        type: String,
        require:true,
    },
    payment_amount:{
        type: mongoose.Schema.Types.Double,
        required: true
    }
},{
    //to create a timestamps for each rwo in table. 
    timestamps: true
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;