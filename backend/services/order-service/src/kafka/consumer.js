const { Kafka } = require('kafkajs')
// const Order = require('../models/Order.js')
const {createOrder} = require('../controllers/order.controller')


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
            
            await createOrder(messageValue)
            
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