const { ObjectID } = require('mongodb')
const mongoose   = require('mongoose')

const TaskSchema = new mongoose.Schema({
    card: ObjectID,
    text: String,
})

const CardSchema = new mongoose.Schema({
    title: String,
    board: ObjectID,
    position: Number,
    tasks: [TaskSchema]
})

const CardModel = mongoose.model('Card', CardSchema)
const TaskModel = mongoose.model('Task', TaskSchema)

module.exports = {cardSchema: CardSchema, cardModel: CardModel, taskModel: TaskModel,}