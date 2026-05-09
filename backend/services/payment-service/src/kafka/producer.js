const { Kafka } = require('kafkajs')

 const kafka = new Kafka({
        clientId: "payment-service",
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
        console.log('payment successful message sent to Kafka');
        console.log(message);
    } catch (error) {
        console.error(`Error sending message to topic ${topic}`, error);
    }   
};

module.exports = {
    sendMessage,
};