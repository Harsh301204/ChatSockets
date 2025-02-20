const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const {PORT} = require('./src/config/config.js')
const connect = require('./src/config/database-config.js')
const Chat = require('./src/models/chat.js')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const ejs = require('ejs')



app.use('/', express.static(__dirname + '/public'));                   // Will help in rendering static html css files

io.on('connection', (socket) => {
    // console.log('a user connected' , socket.id);

    socket.on('join_room' , (data) => {
        
        socket.join(data.roomid) 
        
    })
    socket.on('msg_send' , async (data) => {
        console.log(data)
        // io.emit('Messsage Recieved' , data) 
        let chat = await Chat.create({
            content : data.msg,
            user : data.username,
            roomId : data.roomid
        })
        io.to(data.roomid).emit('Messsage Recieved' , data)
        // socket.emit('Messsage Recieved' , data)
        // socket.broadcast.emit('Messsage Recieved' , data)
    })

    socket.on('Typing' , (data) => {
        socket.broadcast.to(data.roomid).emit("User_Typing")
    })

});

app.set('view engine' , 'ejs')
app.get('/chat/:roomId' , async (req , res) => {
    const chats = await Chat.find(  {
        roomId : req.params.roomId
    }).select('content user')
    console.log(chats)
    res.render('index' , {
        name : "Harsh",
        roomid : req.params.roomId,
        chat : chats
    });
    
})
server.listen(PORT, async () => {
    console.log("Server Started on PORT :" , PORT)
    await connect()
    console.log("Mongo DB Connected")
})

