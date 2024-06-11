const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  buyer: String,
  location: String,
  imageUrl: String, // Add this field if you plan to store image URLs
});

const ProductModel = mongoose.model("ProductsInfo", ProductSchema);

module.exports = ProductModel;
