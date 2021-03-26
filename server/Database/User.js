const mongoose = require("mongoose")

const Users = new mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  passwordHash : {
    type : String,
    required : true
  },
  date : {
    type : Date,
    default : Date.now
  }
})

const User = mongoose.model("Users",Users)

module.exports = User

