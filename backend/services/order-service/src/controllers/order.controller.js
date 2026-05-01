const Order = require('../models/Order');


exports.createOrder = async (order) => {
    try {
        const response = await Order.create({
            payment_id: order.id,
            payment_details: order,
            // orderStatus: "order created",
        })
        // send an email to kafka topic to send email to user about order creation
        
        console.log("Order created successfully:", response);
    } catch (error) {
         console.error("Error creating order:", error);
         throw new Error("Failed to create order");
    }
}

exports.getOrders = async (req, res) => {

    try {
        const orders = await Order.find();
        console.log("Orders fetched successfully:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
}
