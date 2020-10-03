const express     = require ('express')
const boardRoutes = require('./routes/board')
const app         = express()
const mongoose    = require('mongoose')
const port        = 3030


// Setting up database connection
mongoose.connect('mongodb+srv://chrisfotos:sed1sed1@cluster0.ishhg.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

// Setting up middlewear, including routes
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use('/boards', boardRoutes)

app.listen(port)