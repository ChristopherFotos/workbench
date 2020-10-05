const mongoose = require('mongoose')
const express  = require('express')
const bcrypt   = require('bcrypt')
const passport = require('passport')
const Board    = require('../models/Board').boardModel
const Card     = require('../models/Card').cardModel
const Task     = require('../models/Card').taskModel
const User     = require('../models/User')
const initPassport = require('../passport-config')
const router   = express.Router()

initPassport(passport)
router.use(passport.initialize())
router.use(passport.session())


router.post('/register', async (req, res) => {
    await bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            console.log(err)
            res.send('Error')
        }

        let user = new User({
            username: req.body.username,
            password: hash
        })

        user.save()

        res.json(user)
    })
})

router.post('/login', passport.authenticate('local'), (req, res)=>{
    
    res.send(req.user)
})

router.post('/test', passport.initialize(), (req, res)=>{
    console.log('USER USER USER USER USER USER', req.user)
})

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     } else res.send('error')
//   }

module.exports = router