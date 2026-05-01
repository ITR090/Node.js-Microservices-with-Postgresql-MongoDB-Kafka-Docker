

## Ecommece MERN Stack App built with microservices architecture.

- NOTE: This is still in WIP (Work In Progress)

# 🚀 Services Overview

Placeholder for architecture diagram


### Core Services

| Service Name       | Port | Description                   |
| ------------------ | ---- | ----------------------------- |
| API Gateway        | 4000 | Entry point & request routing |
| Restaurant Service | 7071 | Restaurant management logic   |
| Payment Service    | 7072 | Payment processing            |
| Order Service      | 7073 | Order lifecycle management    |
| Cart Service       | 7074 | Shopping cart handling        |
| Email Service      | 7075 | Transactional email delivery  |
| Log Service        | 7076 | Centralized logging           |


### Supporting Services
| Service Name | Port | Description                |
| ------------ | ---- | -------------------------- |
| Redis        | 6379 | Caching              |
| Redis UI     | 8001 | Redis management interface |
| Kafka        | 9092 | Kafka monitoring interface |
| Kafka UI     | 8080 | Kafka monitoring interface |


### 🛠️ Tech Stack
- Node.js
- Express.js
- Redis
- Kafka
- Microservices Architecture

### 🚦 Getting Started
- Clone the repository
- Install dependencies for each service
- Start docker-compose.yml file
- Access the API through the gateway at localhost:4000