const dotenv = require('dotenv')
const express = require("express");
const app = express();
const cors = require('cors')
const {receiveMessage} = require('./kafka/consumer')

dotenv.config();

// Load environment variables from .env file based on the NODE_ENV value
if (process.env.NODE_ENV == 'development') {
    console.log("in development env");
    dotenv.config({ path: './env/.env.development' });
} else {
    console.log("in production env");
    dotenv.config({ path: './env/.env.production' });
}

// Enable CORS middleware
app.use(cors())
app.use(express.json());
receiveMessage()

app.listen(process.env.PORT, () =>
  console.log(`Email Service running on ${process.env.PORT}`)
);
