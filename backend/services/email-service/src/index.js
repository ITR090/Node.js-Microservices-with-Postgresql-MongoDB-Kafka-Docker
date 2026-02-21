const dotenv = require('dotenv')
const express = require("express");
const app = express();

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

app.listen(process.env.PORT, () =>
  console.log(`Email Service running on ${process.env.PORT}`)
);
