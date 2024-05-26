const mongoose = require ('mongoose');
const ownerschema = new mongoose.Schema({
     name:String,
     email:String,
     password:String
})
const ownermodel =mongoose.model('Owner',ownerschema);
module.exports = ownermodel;