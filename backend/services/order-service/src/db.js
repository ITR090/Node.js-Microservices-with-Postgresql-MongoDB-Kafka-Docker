const mongoose = require('mongoose');
// MongoDB connection setup
async function connectDB() {

    try {
        const response = await mongoose.connect(process.env.MONGO_URI)
        if (response) {
            console.log("Connected to the MongoDB database");
        }

    } catch (error) {
        console.error('Database connection error', error.stack);
    }
}
connectDB()
