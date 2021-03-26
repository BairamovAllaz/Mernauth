import React from 'react'
import axios from 'axios'
function Home() { 
   
   const logout = () => {
     axios.get("http://localhost:8100/register/logout").then(() => {
       console.log("logout")
       window.location.reload()
     }).catch(err => {
       console.log(err)
     })


    

   }
   
   
  return (
    <div>
       
       <div style = {{width : "100%",height : "auto",textAlign : "center",padding : "40px"}}>
         <h1 style = {{color : "green"}}>Nice you are in</h1>
         <button className = "btn btn-danger" style = {{marginTop : "30px"}} onClick = {logout}>Log out</button>
       </div>
      
    </div>
  )
}

export default Home
