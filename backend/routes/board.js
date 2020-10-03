const express = require('express')
const Board   = require('../models/Board')
const Card    = require('../models/Card').cardModel
const Task    = require('../models/Card').taskModel
const router = express.Router()

router.post('/add', async (req, res) => {
    
    if(req.body.operation === "add-board"){ 
        await newBoard(req)
        Board.find({name: req.body.name}, (err, results) => {
            if(err) {console.log(err)}
            res.json(results)
        })
    }

    if(req.body.operation === "add-card"){
        await newCard(req)
        Board.findById(req.body.boardID, (err, result)=>{
            if(err){console.log(err)}
            res.json(result)
        }) 
    }    

    if(req.body.operation === "add-task"){
        await newTask(req)
        Card.findById(req.body.cardID, (err, result)=>{
            if(err){console.log(err)}
            res.json(result)
        }) 
    }    
})

async function newBoard(req){
    const newBoard = new Board({
        name: req.body.name,
        cards: [],
        numOfCards: 0
    })
    newBoard.save()
}

async function newCard(req){
    let board = await Board.findById(req.body.boardID)
    let card  = await new Card({
        board: board._id, 
        title: req.body.title, 
        position: req.body.position
    })

    await card.save()
    board.cards.push(card)
    await board.save()
}

async function newTask(req){
    let card = await Card.findById(req.body.cardID)
    let task = await new Task({
        card: card._id, 
        text: req.body.text 
    })

    await task.save()
    card.tasks.push(card)
    await card.save()
}

module.exports = router