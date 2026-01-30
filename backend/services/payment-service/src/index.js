const dotenv = require('dotenv')
const express = require("express");
const app = express();
const cors = require('cors')

dotenv.config();
console.log('payment service running on ' +process.env.NODE_ENV)
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

app.use("/api/payment", require("./routes/payment.routes"));


app.listen(process.env.PORT, () =>
  console.log(`Payment Service running on ${process.env.PORT}`)
);