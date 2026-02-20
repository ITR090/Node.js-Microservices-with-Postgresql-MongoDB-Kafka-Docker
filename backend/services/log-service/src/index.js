const dotenv = require('dotenv')
const express = require("express");
const app = express();
const { receiveMessage } = require('./kafka/consumer')

dotenv.config();
console.log('log service running on ' + process.env.NODE_ENV)
// Load environment variables from .env file based on the NODE_ENV value
if (process.env.NODE_ENV == 'development') {
    console.log("in development env");
    dotenv.config({ path: './env/.env.development' });
} else {
    console.log("in production env");
    dotenv.config({ path: './env/.env.production' });
}


receiveMessage()

app.listen(process.env.PORT, () =>
  console.log(`Log Service running on ${process.env.PORT}`)
);
