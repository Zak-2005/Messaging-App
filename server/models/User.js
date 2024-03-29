const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    friends: {
        type:Array,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)