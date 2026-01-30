
const Payment = require('../models/Payment.js')

exports.createPayment = async (req, res) => {

    try {
        const {id, payment_method,payment_amount} = req.body
        const response = new Payment({
            id,
            payment_method,
            payment_amount,
        })
        const results = await response.save()
        if (results){
            res.status(201).json({ message: 'Payment created Successfully', results });

            // kafak
        }

    } catch (error) {
        res.status(500).json({message:'Payment Error please try again later' , error});
    }
};



