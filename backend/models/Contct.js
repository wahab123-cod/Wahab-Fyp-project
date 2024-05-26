const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  messag: String,
  info: String
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;