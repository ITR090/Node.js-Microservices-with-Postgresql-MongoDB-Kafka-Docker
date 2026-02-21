#!/bin/bash

init_scripts() {
  sleep 10
  echo "Creating Kafka topics..."
  kafka-topics.sh --create --topic payment-successful --partitions 1 --replication-factor 1 --if-not-exists --bootstrap-server kafka:9092;
  kafka-topics.sh --create --topic order-successful --partitions 1 --replication-factor 1 --if-not-exists --bootstrap-server kafka:9092;
  kafka-topics.sh --create --topic email-successful --partitions 1 --replication-factor 1 --if-not-exists --bootstrap-server kafka:9092;
  kafka-topics.sh --list --bootstrap-server kafka:9092;
}

init_scripts &