const mongoose = require('mongoose')
const board    = require('./Board').boardSchema

const UserSchema = new mongoose.Schema ({
    username: String,
    password: String,
    boards  : [board]
})

module.exports = mongoose.model('User', UserSchema)