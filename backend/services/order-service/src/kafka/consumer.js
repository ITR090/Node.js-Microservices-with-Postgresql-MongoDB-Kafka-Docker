const { Kafka } = require('kafkajs')
const Order = require('../models/Order.js')

 const kafka = new Kafka({
        clientId: "order-service",
        brokers: ["kafka:9092"],
    });

const consumer = kafka.consumer({ groupId: 'order-service' })

const receiveMessage = async () => {

try {
    
    await consumer.connect()
    await consumer.subscribe({ topic: 'payment-successful', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
         try {
            const messageValue = JSON.parse(message.value.toString())
            console.log(`Received message from topic ${topic}:`, messageValue);
            const response = await Order.create({
                id: messageValue.id,
                topicMessage: JSON.stringify(messageValue),
                orderStatus: "order placed"
            })
            console.log("Order created successfully:", response);
            //const parsedMessage = JSON.parse(messageValue)
            // await Order.create({
            //     id: parsedMessage.id,
            //     topicMessage: parsedMessage,
            //     orderStatus: "order placed"
            // })
         } catch (error) {
            console.error("Error creating order:", error);
         }
        },
      })
} catch (error) {
    console.error("Error in Kafka consumer", error);
}


}

module.exports = {
    receiveMessage,
}