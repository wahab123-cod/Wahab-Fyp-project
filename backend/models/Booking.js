const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    location: String,
    slots: [{
      startTime: String,
      endTime: String,
      date: String,
      selected: Boolean,
  }],
    name:String,
    duration:Number,
    price:Number,
    approved:Boolean,
    rejected:Boolean,
    rejectReason:String,
   
  });
  const Booking = mongoose.model("Booking", bookingSchema);
  module.exports = Booking