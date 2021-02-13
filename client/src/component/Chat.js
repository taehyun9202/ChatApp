import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'

var socket
function Chat(props) {
    console.log(props.user)
    console.log(props.match.params.id)
    const [ user, setUser ] = useState(props.user)
    const [ room, setRoom ] = useState(props.match.params.id)
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])
    const history = useHistory();
    if (!user) history.push("/")
    const ENDPOINT = "localhost:8000"
    const connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity",
        "timeout" : 10000,
        "transports" : ["websocket"]
    };

    useEffect(() => {
        socket = io.connect(ENDPOINT, connectionOptions);
        socket.emit('join',  ({ user, room }), () => {
        })

        // return () => {
        //     socket.emit('disconnect')
        //     socket.off()
        // }
    }, [ENDPOINT, user])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])


    const sendMessage = e => {
        e.preventDefault()
        if (message) {
            console.log(user, message)
            socket.emit('sendMessage', ({user, room, message}), () => setMessage(''))
        }
    }

    return (
        <div>
            <h1>Chat {room}</h1>
            <div>
                {messages.map(message => (
                        <p>{ message.name ?
                                message.name + ": " +message.text :
                                message.text
                        }</p>
                ))}
            </div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
            <button onClick={sendMessage}>Leave</button>
        </div>
    )
}

export default Chat
