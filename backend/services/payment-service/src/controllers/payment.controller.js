const Payment = require('../models/Payment.js')
const { sendMessage } = require('../kafka/producer.js')

exports.createPayment = async (req, res) => {

    try {
        const { payment_method, payment_amount, cart_items } = req.body
        console.log(payment_amount)
        console.log(cart_items)
        const response = new Payment({
            payment_method,
            payment_amount,
            cart_items:cart_items
        })
        console.log("Payment data received:", response); // Log the payment details for debugging
        const results = await response.save()
        console.log("Payment saved successfully:", results); // Log the saved payment details for debugging
       
        if (results) {
            res.status(201).json({ message: 'Payment created Successfully', results });
            // Send message to Kafka
            await sendMessage('payment-successful', results);

        }

    } catch (error) {
        res.status(500).json({ message: 'Payment Error please try again later', error });
    }
};



