const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  buyer: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String } // Assuming image is stored as a file path or URL
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
