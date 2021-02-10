import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function Join(props) {
    const [ user, setUser ] = useState(props.user)
    const [ room, setRoom ] = useState('')

    return (
        <div>
            <h1>Hello {user.userName}</h1>

            <input
                type="text" 
                placeholder='Enter Room Name' 
                value={room}
                onChange={e => setRoom(e.target.value)}
            />
            <Link to={`/chat`}>
                <button type="submit">Enter</button>
            </Link>
        </div>
    )
}

export default Join
