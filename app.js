const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const path = require('path')


// Initialize the app
const app = express()

// Defining the PORT
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// BodyParser middleware
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) =>{
    res.json({
        message: 'This is route base for auth system'
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})