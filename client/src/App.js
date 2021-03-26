
import './App.css';
import {useState,useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import {Context} from './Context'
import {useHistory} from 'react-router-dom'
import Home from './layouts/Home'
import Register from './layouts/Register' 
axios.defaults.withCredentials = true
function App() { 
  const history = useHistory()
  const [loggedin,setloggedin] = useState("")

   useEffect(() => { 
     axios.get("http://localhost:8100/register/loggedin").then(res => {
       setloggedin(res.data)
     }).catch(err => {
       console.log(err)
     })
   },[])

   
    
  return (
    <div className="App">
      <Context.Provider value = {{loggedin}}>


        {
          loggedin ? (
         
            
                <Home/>

          ) : (
            <div>
                   <Register/>
            </div>
          )
        }

    


        
        
      </Context.Provider>
    </div>
  );
}

export default App;
