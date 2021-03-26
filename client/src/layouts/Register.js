import React,{useState,useEffect,useContext} from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import {Context} from '../Context'
import {useHistory} from 'react-router-dom'


const Alldiv = styled.div`
width : 400px;
height : auto;
margin : 100px auto;
@media (max-width: 768px) {
    width : 90vw;
    height : 100vh;
    margin : 0px auto;
  }
`

const Header = styled.h1`
color : yellow;
text-align : center;
font-family : sans-serif;
font-weight : 700
`


const Button = styled.button`
background-color : yellow;
width : 20%;
border  : none;
border-radius : 100px;
float : right;
margin-top : 30px;
margin-right : 20px;
height : 50px
`
const Div2 = styled.div`
margin : 10% auto;
@media (max-width: 768px) {
   margin : 50% auto
  }
`

const Plogin  = styled.p`
color : white;
clear: both;
margin-top : 100px;
margin-left : 20px
`



function Register() {
  const {loggedin} = useContext(Context)
  const [change,setchange] = useState(false)

  const [username,setusername] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const [passwordverify,setpasswordverify] = useState("")
  const [image,setimage] = useState()
  const [errorsign,seterrorsigin] = useState("")
  const [errorlogin,seterrorlogin] = useState("")
  const history = useHistory()






const Signin = () => {


    const user = {
      username,
      email,
      password,
      passwordverify
    }


  axios.post("http://localhost:8100/register/sigin",user).then((res) => {
    window.location.reload()
  }).catch(err => {
  console.log(err.response.data)
  seterrorsigin(err.response.data)
  setusername("")
  setemail("")
  setpassword("")
  setpasswordverify("")
  })
}   



const Login = () => {


  const user = {
    email,
    password
  }

  axios.post("http://localhost:8100/register/login",user).then(() => {
    window.location.reload()
  }).catch(err => {
    console.log(err.response.data)
    seterrorlogin(err.response.data)
    setemail("")
    setpassword("")

  })
}




    return (
    <div>
   
    <Alldiv>
    <Div2>
    {
      change ? (
          <div>
          <Header>Sign in</Header>
  <input type = "text" placeholder = "Username" className = "form-control" style = {{marginTop : "30px"}} onChange = {(e) => {setusername(e.target.value)}} value = {username}/>
  <input type = "email" placeholder = "Email" className = "form-control" style = {{marginTop : "30px"}} onChange = {(e) => {setemail(e.target.value)}} value = {email}/>
  <input type = "password" placeholder = "Password" className = "form-control" style = {{marginTop : "30px"}} onChange = {(e) => {setpassword(e.target.value)}} value = {password}/>
  <input type = "password" placeholder = "Passwordverify" className = "form-control" style = {{marginTop : "30px"}} onChange = {(e) => {setpasswordverify(e.target.value)}} value = {passwordverify}/>
  <Button onClick = {Signin}>Sign</Button>
  <Plogin>Already have account : <span style = {{color : "blue",cursor : "pointer"}} onClick = {() => {
    setchange(false)
    setusername("")
    setemail("")
    setpassword("")
    setpasswordverify("")
  }}>Login in</span></Plogin>

  {
    errorsign ? (
      <p className = "alert alert-danger">{errorsign}</p>
    ) : (null)
  }
 
  
   

  </div>
      ) : (
        <div>
        <Header>Login</Header>
  <input type = "email" placeholder = "Email" className = "form-control" style = {{marginTop : "30px"}} onChange = {(e) => {setemail(e.target.value)}}/>
  <input type = "password" placeholder = "Password" className = "form-control" style = {{marginTop : "30px"}} onChange = {(e) => {setpassword(e.target.value)}}/>
  <Button onClick = {Login}>Login</Button>
  <Plogin>Not have account : <span style = {{color : "blue",cursor : "pointer"}} onClick = {() => {
    setchange(true)
    setusername("")
    setemail("")
    setpassword("")
    setpasswordverify("")
  }}>Sign in</span></Plogin>
  {
    errorlogin ? (
      <p className = "alert alert-danger">{errorlogin}</p>
    ) : (null)
  }
 
  
        </div>
      )
    }
  </Div2>
  </Alldiv> 
  
   </div>
  )
}

export default Register
