const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use('/', express.static(__dirname + '/public'));                   // Will help in rendering static html css files

io.on('connection', (socket) => {
    console.log('a user connected' , socket.id);

    socket.on('msg_send' , (data) => {
        console.log(data)
        // io.emit('Messsage Recieved' , data)
        // socket.emit('Messsage Recieved' , data)
        socket.broadcast.emit('Messsage Recieved' , data)
    })

});



server.listen(3001, () => {
    console.log("Server Started on PORT : 3001")
})

