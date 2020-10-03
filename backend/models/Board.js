const mongoose = require('mongoose');
const Card     = require('./Card')

const BoardSchema = new mongoose.Schema({
    name : String,
    cards: [Card.cardSchema],
    numOfCards: Number
})

module.exports = mongoose.model('Board', BoardSchema)