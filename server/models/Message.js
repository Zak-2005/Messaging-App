const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    chat: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    user:{
        type:Object,
        required: true
    }
})

module.exports = mongoose.model('Message', messageSchema)