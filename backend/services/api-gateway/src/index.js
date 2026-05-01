const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors')


const PORT = process.env.PORT
const app = express();

console.log('API gateway service running on ' +process.env.NODE_ENV)
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


app.use("/api/restaurants",
  createProxyMiddleware({
    target: `http://${process.env.restaurant_service}`, 
    changeOrigin: true
  })
);

app.use("/api/cart",
  createProxyMiddleware({
    target: `http://${process.env.cart_service}`, 
    changeOrigin: true
  })
);


app.use("/api/payment",
  createProxyMiddleware({
    target:`http://${process.env.payment_service}`,
    changeOrigin: true
  })
);

app.use("/api/orders",
  createProxyMiddleware({
    target:`http://${process.env.order_service}`,
    changeOrigin: true
  })
);

app.listen(PORT, () =>
  console.log(`API Gateway running on ${PORT}`)
);
