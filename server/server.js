const express = require('express')
const cors = require("cors")
const port = 8000;
const db_name = "chatapp"
const socketio = require('socket.io')
const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())

require("./config/mongoose")(db_name)
require("./routes/User.routes")(app)
require("./routes/Room.routes")(app)
require("./routes/Message.routes")(app)

server = app.listen(port, () => console.log(`Listening on port ${port}`))

var connectedIds = []
const io = socketio(server) 
io.on('connection', function(socket) {
    
    console.log('we have a new connection')
    socket.on('join', (res, callback) => {
        var clients = {}
        if (res.user) {
            connectedIds.push(socket.id)
            clients[`${socket.id}`] = res.user
            console.log(clients)
            console.log(res.user.userName + " entered " + res.room)
            socket.emit("message", { name: null, text:`${res.user.userName} entered ${res.room}`})
            socket.broadcast.to(res.room).emit('message', { name: null, text:`${res.user.userName} joined ${res.room}`})
            socket.join(res.room)
            var total = io.engine.clientsCount;
            // socket.emit('getCount',total).
            console.log(total)
            callback()
        }
        else {
            console.log("No user")
        }
    })

    socket.on('sendMessage', (res, callback) => {
        console.log(res)
        socket.emit("message", { name: res.user.userName, text: res.message})
        socket.broadcast.to(res.room).emit('message', { name: res.user.userName, text: res.message})
        callback()
    })

    socket.on('disconnect', () => {
        console.log('user left')
        // var index = arr.indexOf(value);
        //     if (index > -1) {
        //         arr.splice(index, 1);
        //     }
        //     return arr;
    })
})