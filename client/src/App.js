import react, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Chat from "./component/Chat";
import Join from "./component/Join";
import Login from "./component/Login";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Register from './component/Register';

function App() {
  const [ room, setRoom ] = useState("")
  const id = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const config = {
    headers: {
        "Content-type": "application/json",
        "x-auth-token": token
    }
  }
  const [ loggedInUser, setLoggedInUser ] = useState(null)
  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`, config)
      .then(res => {
        console.log(res.data[0])
        setLoggedInUser(res.data[0])
      })
  }, [token])

  return (
    <div className="app">
      <Router>
        { loggedInUser ? 
          <Route path="/" exact>
            <Join user={loggedInUser} />
          </Route> :
          <Route path="/login" exact>
            <Login />
          </Route>
        }
        <Route path={`/chat`} exact>
            <Chat user={loggedInUser} room={room} />
        </Route>
        <Route path="/register" exact>
            <Register />
          </Route>
      </Router>
    </div>
  );
}

export default App;
