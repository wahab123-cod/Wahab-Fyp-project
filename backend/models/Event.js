const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
