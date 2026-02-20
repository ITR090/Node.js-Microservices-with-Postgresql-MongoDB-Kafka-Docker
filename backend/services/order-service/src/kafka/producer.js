const { Kafka } = require('kafkajs')

 const kafka = new Kafka({
        clientId: "order-service",
        brokers: ["kafka:9092"],
    });

const producer = kafka.producer();


const sendMessage = async (topic, message) => {
    try {
        await producer.connect();
        await producer.send({   
            topic,
            messages: [ { value: JSON.stringify(message) } ],
        });
        console.log(`Message sent to topic ${topic}`);
    } catch (error) {
        console.error(`Error sending message to topic ${topic}`, error);
    }   
};

module.exports = {
    sendMessage,
};