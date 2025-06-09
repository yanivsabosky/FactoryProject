const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  numOfActions: {
    type: Number,
    default: 10 
  },
  role: {
  type: String,
  enum: ['Admin', 'User'],
  default: 'User'
  },
  actionsToday: {
    type: Number,
    default: 0
  },
  lastActionAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
