const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price:{
    type:Number,
    required:true
  },
  image: String // Define image field as type String
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
