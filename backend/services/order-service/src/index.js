const dotenv = require('dotenv')
const express = require("express");
const app = express();
const cors = require('cors')
const { receiveMessage } = require('./kafka/consumer')

dotenv.config();
console.log('order service running on ' +process.env.NODE_ENV)
// Load environment variables from .env file based on the NODE_ENV value
if (process.env.NODE_ENV == 'development') {
    console.log("in development env");
    dotenv.config({ path: './env/.env.development' });
} else {
    console.log("in production env");
    dotenv.config({ path: './env/.env.production' });
}
require('./db')

// Enable CORS middleware
app.use(cors())
app.use(express.json());

app.use("/api/orders", require("./routes/order.routes"));
receiveMessage()

app.listen(process.env.PORT, () =>
  console.log(`Order Service running on ${process.env.PORT}`)
);