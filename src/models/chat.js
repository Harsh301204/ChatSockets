const mongoose = require('mongoose')
const {Schema} = mongoose

const chatSchema = new Schema({
    content : {
        type : String
    },

    user: {
        type : String
    },
    
    roomId : {
        type : String
    }
})

const Chat = mongoose.model('Chat' , chatSchema)
module.exports = Chat