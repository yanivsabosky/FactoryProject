require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to usersDB'))
    .catch(console.log);
};

module.exports = connectDB;
