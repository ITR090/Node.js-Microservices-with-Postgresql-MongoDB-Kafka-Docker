const Order = require('../models/Order');
const {sendMessage} = require('../kafka/producer')

exports.createOrder = async (payment_details) => {

    try {
        const order = new Order({
            payment_details,
        })
        const response = await order.save()

        if(response){
            console.log('Order created successfully:', response);
            await sendMessage('email-successful', response)
            console.log('Email successful message sent to Kafka');
        }
    } catch (error) {
         console.error("Error creating order:", error);
         throw new Error("Failed to create order");
    }
}

exports.getOrders = async (req, res) => {

    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
}
