const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../Database/User")
const path = require("path")
const auth  = require("../middleware/auth")
const { body, validationResult, check } = require('express-validator');







router.post("/sigin",
check("email","we need email").notEmpty(),
check("email","email is not true!!!!").isEmail(),
check("password","we need password").notEmpty(),
check("password","password so long").isLength({min : 5}),
check("passwordverify","we need passwordverify").notEmpty(),

async(req,res) => {
  try{
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
    }


 

    const {username,email,password,passwordverify} = req.body
     if(password != passwordverify)
     {
       return res.status(400).send("sifreler ayni olmali")
     }
 
     if (!username) username = email;

     const salt = await bcrypt.genSalt()
     const passwordHash = await bcrypt.hash(password,salt)



     const newuser = new User({
      username : username,
      email : email,
      passwordHash : passwordHash
     })


     const saveduser = newuser.save().then(data => {
       console.log(data)
     })
   
      const token = jwt.sign({
       user : saveduser._id
     },
     process.env.JWT_SECRET
     )
   
     res.cookie("token",token,{httpOnly : true}).send() 

  }catch(err){
    console.log(err)
  }
})



 router.post("/login",
 check("email","inavlid email adress").isEmail(),
 check("email","email is empty").notEmpty(),
 check("password","password min 5").isLength({min : 5}),
 check("password","password empty").notEmpty(),
 async(req,res) => {

  try{

    const errors = validationResult(req);

    if (!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
    }



    const {email,password} = req.body
    
    const tokuser = await User.findOne({email})

    if (!tokuser)
    return res.status(401).send("Wrong email or password");
  
  
    const passwordCorrect = await bcrypt.compare(
      password,
      tokuser.passwordHash
    );
  
    if (!passwordCorrect)
      return res.status(401).send("Wrong email or password.");
  
  
  
      const token = jwt.sign(
        {
          user: tokuser._id,
        },
        process.env.JWT_SECRET
      );
  
  
      res.cookie("token",token,{httpOnly : true}).send()
  
  
  }catch(err){
    console.log(err)
  }
})


router.get("/logout",(req,res) => {
  res.cookie("token","",{httpOnly : true}).send()
})



router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.send(false);
  }
});


    
  
router.get("/user",auth,async(req,res) => {
const user = await User.findById(req.user);

res.send(user.username)



})



module.exports = router
