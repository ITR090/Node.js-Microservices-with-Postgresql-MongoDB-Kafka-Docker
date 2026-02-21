// const { Kafka } = require('kafkajs')
import {Kafka} from 'kafkajs'

const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["kafka:9092"],
});

const admin = kafka.admin();


const createTopics = async () => {
  try {  
    await admin.connect();
    await admin.createTopics({
      topics: [
        { 
          topic: "payment-successful",
          numPartitions:1,
          replicationFactor:1
        },  
        { topic: "order-successful",
          numPartitions:1,
          replicationFactor:1
         },
        { topic: "email-successful",
          numPartitions:1,
          replicationFactor:1
         },
      ],
    });
    console.log("Topics created successfully");
  } catch (error) {
    console.error("Error creating topics", error);
  } finally {
    await admin.disconnect();
  }
};

const startKafkaService = async () => {
  try {
    await createTopics(); 
  } catch (error) {
    console.error("Error starting Kafka service", error);
  }
};

startKafkaService();
