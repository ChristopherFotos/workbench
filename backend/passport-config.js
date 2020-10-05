const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')

function initialize(passport){
    async function authenticateUser(username, password, done){ // this function is passed to the LocalStrategy, which calls it with username, password and done arguments
        let user = await User.findOne({username: username})    // finding the user in the database using the username supplied by the passport
        await bcrypt.compare(password, user.password, (err, result)=>{ // comparing the password supplied by the localstrategy (whic it gets from the body of the request) to the hased password in the database
            if(err){ 
                console.log('There was an error while checking password: ', err)
                return done(err, false, {message: 'There was an error while checking password'})
            }

            if(result){
                return done(null, user)
            } else if (result === false){
                console.log('incorrect password')
                return done(null, false, {message: 'wrong password'})
            }
        })
        
    }


    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((user, done) => {console.log('this is running');done(null, user._id)})
    passport.deserializeUser(async (id, done) => {
      console.log('DESERIALIZE-ID',id)
      let user = await User.findById(id) 
      console.log('DESERIALIZE-USER', user)
      return done(null, user)
    })
}


module.exports = initialize

// This function is invoked in routes/user.js