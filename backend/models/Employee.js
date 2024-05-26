
const mongoose = require("mongoose");

const Employeeschema = new mongoose.Schema({
  name: String,
  email:String,
  password:String,
  phoneNumber:Number,
  gender:String

})
const Employeemodel =mongoose.model("employee",Employeeschema)
module.exports= Employeemodel