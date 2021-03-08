
import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory}  from 'react-router-dom'



axios.defaults.withCredentials = true

function App() {
  const [loggedIn, setLoggedIn] = useState();

  const [username,setusername] = useState("")
  const [displayName,setdisplayName] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const [passwordverify,setpasswordverify] = useState("")
  const [errmsgsign,seterrmsgsign] = useState("")
  const [errmsglogin,seterrmsglogin] = useState("")
  const history = useHistory()



  const [openlogin, setOpenlogin] = useState(false);

  const handleClickOpenlogin = () => {
    setOpenlogin(true);
  };

  const handleCloselogin = () => {
    setOpenlogin(false);
  };





  const [opensign, setOpensign] = useState(false);

  const handleClickOpensign = () => {
    setOpensign(true);
  };

  const handleClosesign = () => {
    setOpensign(false);
  };



const getauth = () => {

   axios.get("http://localhost:5100/loggedIn").then((res) => {
    setLoggedIn(res.data)
  })


}


useEffect(() => { 
  getauth()
},[])



const handlesigiin = (e) => {
  e.preventDefault();

  const newuser = {
    username : username,
    email : email,
    password : password,
    passwordverify : passwordverify
  }
   axios.post("http://localhost:5100/sigin",newuser).then(res => {
     console.log("data alindi")
     setdisplayName(res)
     window.location.reload()
   }).catch(err => {
    seterrmsgsign(err.response.data)
  })  
}

const logout = (e) => {
  e.preventDefault()


    axios.get("http://localhost:5100/logout").then(() => {
      console.log("user deleting success")
      window.location.reload()
    })
 




}


const handlelogiin = (e) => {
e.preventDefault()

  const user = {
    email : email,
    password : password
  }
  axios.post("http://localhost:5100/login",user).then(res => {
    console.log(res)
    setdisplayName(res)
    window.location.reload()
  }).catch(err => {
    seterrmsglogin(err.response.data)
  })
}

 


  

  return (
    <div className="App">
      <div className = "allforum">

        {
          loggedIn ? (
            <div style = {{textAlign : "center",marginTop : "20px"}}>

          <p className = "alert alert-success">{displayName}</p>
              <button className  = "btn btn-danger" onClick = {logout}>Log out</button>
            </div>
          ) : (
            <div>
                <p className = "text1">please regitser or create new account</p>
              <div className = "all-btn">
            
                <br/>
                <button className = "btn btn-success" style = {{marginRight : "20px"}} onClick = {handleClickOpensign}>Login</button>
                <button className = "btn btn-primary" onClick = {handleClickOpenlogin}>Sign in</button>
              </div>

            </div>
          )
        }



{/* login!!!! */}


<Dialog open={openlogin} onClose={handleCloselogin} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            onChange = {(e) => {setemail(e.target.value)}}
          />
          <br/>
          <br/>
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label="password"
            type="password"
            fullWidth
            onChange = {(e) => {setpassword(e.target.value)}}
          />
          <br/>
          <br/>
          {
            errmsglogin ? (
              <p className = "alert alert-danger">{errmsglogin}</p>
            ) : (
              null
            )
          }
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloselogin} color="primary">
            Cancel
          </Button>
          <Button onClick={handlelogiin} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>







          {/* Sign!!!! */}


<Dialog open={opensign} onClose={handleClosesign} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login in</DialogTitle>
        <DialogContent>

        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            onChange = {(e) => {setusername(e.target.value)}}
          />
          <br/>
          <br/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            onChange = {(e) => {setemail(e.target.value)}}
          />
          <br/>
          <br/>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange = {(e) => {setpassword(e.target.value)}}
          />
          <br/>
          <br/>
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="passwordverify"
            type="password"
            fullWidth
            onChange = {(e) => {setpasswordverify(e.target.value)}}
          />
          <br/>
          <br/>
          {
            errmsgsign ? (
              <p className = "alert alert-danger">{errmsgsign}</p>
            ) : (
              null
            )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosesign} color="primary">
            Cancel
          </Button>
          <Button onClick={handlesigiin} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>







    
      </div>
    </div>
  );
}

export default App;
