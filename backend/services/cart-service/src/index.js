const dotenv = require('dotenv')
const express = require("express");
const app = express();
dotenv.config();
console.log('cart service running on ' +process.env.NODE_ENV)
// Load environment variables from .env file based on the NODE_ENV value
if (process.env.NODE_ENV == 'development') {
    console.log("in development env");
    dotenv.config({ path: './env/.env.development' });
} else {
    console.log("in production env");
    dotenv.config({ path: './env/.env.production' });
}
require('./db')

app.use(express.json());

app.use("/api/cart", require("./routes/cart.routes"));


app.listen(process.env.PORT, () =>  
  console.log(`Cart Service running on ${process.env.PORT}`)
);