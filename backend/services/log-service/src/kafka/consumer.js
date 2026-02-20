const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: "log-service",
    brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: 'log-service' })

const receiveMessage = async () => {

    try {

        await consumer.connect()
        
        await consumer.subscribe({ 
            topic: ["payment-successful", "order-successful", "email-successful"],
            fromBeginning: true 
        })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    switch (topic) {
                        case 'payment-successful':
                            console.log(`Received message from topic ${topic}:`, JSON.parse(message.value.toString()));
                            break;
                        case 'order-successful':
                            console.log(`Received message from topic ${topic}:`, JSON.parse(message.value.toString()));
                            break;
                        case 'email-successful':
                            console.log(`Received message from topic ${topic}:`, JSON.parse(message.value.toString()));
                            break;
                    }
                } catch (error) {

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