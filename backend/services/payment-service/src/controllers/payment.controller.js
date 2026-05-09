const Payment = require('../models/Payment.js')
const { sendMessage } = require('../kafka/producer.js')

exports.createPayment = async (req, res) => {

    try {
        const { payment_method, total, cart_items } = req.body
        
        const response = new Payment({
            payment_method,
            total,
            cart_items:cart_items
        })
        const results = await response.save()
       
        if (results) {
            res.status(201).json({ message: 'Payment created Successfully', results });
            // Send message to Kafka
            await sendMessage('payment-successful', results);
            //console.log('Payment successful message sent to Kafka');
        }

    } catch (error) {
        res.status(500).json({ message: 'Payment Error please try again later', error });
    }
};



