const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const expressvalidation = require("express-validator")
require("dotenv/config")


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({
  origin : true,
  credentials : true
}))
app.use(cookieParser())




//routing
const registersite = require("./Routes/registersite")
app.use("/register",registersite)





app.get("/",(req,res) => {
  res.send("salam")
})




mongoose.connect(process.env.DB_CONNECTION ,{ useUnifiedTopology: true },{ useNewUrlParser: true })
mongoose.connection.once("open",() => {
  console.log("database is working")
})


const Port = process.env.PORT || 8100;
app.listen(Port,() => {console.log("port listening on" + " " + Port)})
