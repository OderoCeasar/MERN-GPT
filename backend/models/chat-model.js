const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true }); 

module.exports = chatSchema;

