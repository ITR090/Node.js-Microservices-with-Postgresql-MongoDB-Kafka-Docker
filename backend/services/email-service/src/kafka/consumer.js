const { Kafka } = require('kafkajs')
const {sendEmail} = require('../controllers/email.controllers')

const kafka = new Kafka({
        clientId: "email-service",
        brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: 'email-service' })

const receiveMessage = async () => {

try {
    
    await consumer.connect()
    await consumer.subscribe({ topic: 'email-successful', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
         try {
            const messageValue = JSON.parse(message.value.toString())
            
            await sendEmail(messageValue)
            
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