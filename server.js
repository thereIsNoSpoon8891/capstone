const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')
require('dotenv').config()
const app = express()


app.use(express.json())
app.use(morgan('dev'))

// Connect to the db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`Connected to the Weather-or-not DB`))
    .catch(err => console.log(err))


// Routes
app.use("/api/auth", require('./routes/authRoute'))
app.use("/api/auth", expressjwt({secret: process.env.SECRET, algorithms:['HS256'] }))




//error handling
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
         res.status(err.status)
    }
    return res.send({errorMessage: err.message })
})


app.listen(9000, () => {
    console.log(`API listening on port 9000`)
})