const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  image: String,
  originalUrl: {
    type: String,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true   // 🔥 THIS fixes everything
  },
  lastScraped: Date
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
