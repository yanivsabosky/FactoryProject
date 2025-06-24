// Load environment variables from a .env file
require("dotenv").config();

// Import mongoose for MongoDB connection
const mongoose = require("mongoose");

// Function to connect to MongoDB using MONGO_URL from .env
const connectDB = () => {
  mongoose
   // Connect using connection string
    .connect(process.env.MONGO_URL)
    // Success message
    .then(() => console.log('Connected to usersDB'))
    // Handle connection errors
    .catch(console.log);
};

// Exports
module.exports = connectDB;
