import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const history = useHistory();
    
    const onSubmitHandler = e => {
        e.preventDefault()
        const usertoLogin = { email, password }
        axios.post('http://localhost:8000/api/signIn', usertoLogin, config)
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
                <button type="submit">Log in</button>
            </form>
            <Link to='/register'>
                <h5>Don't have an accout?</h5>
            </Link>
        </div>
    )
}

export default Login
