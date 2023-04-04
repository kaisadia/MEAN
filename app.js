const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(cors())


const port = 3000;

mongoose.connect(config.database)

mongoose.connection.on('connected', ()=> console.log('Connected to database '+config.database))
mongoose.connection.on('error', (err)=> console.log('Database error: '+err))


const users = require('./routes/users')
app.use('/users', users)



//Set static folder
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.send('invalid endpoint')
})

app.listen(port, () =>
console.log(`Server started on port ${port}`))