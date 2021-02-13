import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

function Register() {
    const [ userName, setUserName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const history = useHistory();
    
    const onSubmitHandler = e => {
        e.preventDefault()
        const usertoLogin = { userName, email, password }
        axios.post('http://localhost:8000/api/signup', usertoLogin, config)
        .then(res => {
                localStorage.setItem('id', res.data.user.id)
                localStorage.setItem('token', res.data.token)
            }
            )
        .catch(err => console.log(err))
        history.push("/")
    }
    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    name={userName}
                    id="name"
                    placeholder="Enter Name"
                    onChange={e => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    name={email}
                    id="email"
                    placeholder="Enter Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name={password}
                    id="password"
                    placeholder="Enter Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <Link to='/'>
                <h5>Already have an accout?</h5>
            </Link>
        </div>
    )
}

export default Register
