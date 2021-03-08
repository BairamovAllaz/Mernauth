const mongoose = require("mongoose")

const Users = new mongoose.Schema({
  username : {type : String, required : true},
  email : {type : String,required : true},
  passwordHash : {type : String,required : true}
})




const User = mongoose.model("user",Users)

module.exports = User


