const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  
  location: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  image: String, // Define image field as type String
});

const Order = mongoose.model("Order", ordersSchema);

module.exports = Order;
