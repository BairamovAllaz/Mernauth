const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const jwt  = require("jsonwebtoken")
const dotenv = require("dotenv");
const bcrypt = require("bcrypt")
const cors = require("cors")
const Users = require("./Users")
const auth = require("./middleware/auth")
require('dotenv/config')


app.use(bodyParser.json())
app.use(cookieParser()) 
app.use(cors({
  origin : ["http://localhost:3000"],
  credentials : true
}))
app.use(express.json())
app.post("/sigin",async(req,res) => {
      try{
        const {username,email,password,passwordverify} = req.body

        if(!email || !password || !passwordverify || !username ){
          return res.status(401).send("degerler bos olamaz")
        }

        if(password != passwordverify){
          return res.status(401).send("parolada bir problem var")
        }

        if(password.length < 5){
          return res.status(401).send("parola 5 den buyuk olmali")
        }
        if(username.length < 2){
          return res.status(401).send("username length need min 3")
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);


          const newuser = new Users({
            username : username,
            email : email,
            passwordHash : passwordHash
          })

          const saveduser = newuser.save()

          const token = jwt.sign(
            {

              user: saveduser._id,
            },
            process.env.JWT_SECRET
          );

          res.cookie("token",token,{httpOnly : true}).send()

        


      }catch(err){
        res.send({err})
      }
})




//login

app.post("/login",async(req,res) => {
  try{

    const {email,password} = req.body


    if (!email || !password)
    return res
      .status(400)
      .send("Please enter all required fields.");

      const existingUser = await Users.findOne({ email });
      if (!existingUser)
        return res.status(401).send("Wrong email or password");

        

        const passwordCorrect = await bcrypt.compare(
          password,
          existingUser.passwordHash
        );
        if (!passwordCorrect)
          return res.status(401).send("Wrong email or password.");




        const token = jwt.sign(
          {
            user: existingUser._id,
          },
          process.env.JWT_SECRET
        );

        res.cookie("token",token,{httpOnly : true}).send()
  }catch(err){
    res.status(401).send()
    console.log(err)
  }

})




///logout


app.get("/logout",(req,res) => {
  res.cookie("token","",{httpOnly : true}).send()
})


//


app.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.send(false);
  }
});



mongoose.connect(process.env.DB_CONNECTION,{ useUnifiedTopology: true },() => {
  console.log("salma")
})

app.listen(5100,() =>{
  console.log("servere bagland")
})