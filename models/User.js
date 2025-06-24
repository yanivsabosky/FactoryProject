const mongoose = require('mongoose');

// Schema for the Users collection in MongoDB
const userSchema = new mongoose.Schema({
  // Unique username (used for login)
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // User's email (also used for login)
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // Display The Full Name of the User
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  // Number Of Action the User Can DO
  numOfActions: {
    type: Number,
    default: 10 
  },
  // Adding role Parmeter 
  // Differentiate between types of users in the system
  role: {
  type: String,
  enum: ['Admin', 'User'],
  default: 'User'
  },
  // The Amount Of Actions the user do 
  // currntly today
  actionsToday: {
    type: Number,
    default: 0
  },
  // Timestamp of the last action (used to reset daily limit)
  lastActionAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });


// creating the model
const Users = mongoose.model('Users', userSchema);

// export the schema 
module.exports = Users;
