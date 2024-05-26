const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
   name:String,
   price:Number,
   buyer:String,
   location:String
});
const ProductModel = new mongoose.model("ProductsInfo",ProductSchema);
module.exports =ProductModel;