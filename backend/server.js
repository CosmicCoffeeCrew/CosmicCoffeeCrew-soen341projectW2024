// remove mongo_URI and PORT and use them from the .env file but rn it s not working so i m keeping them here JAD A


require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const vehicleRoutes = require('./routes/vehicles')
const userRoutes = require('./routes/users')
const reservationRoutes = require('./routes/reservations')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path ,req.method)
    next()
})

// Routes
app.use('/api/vehicles',vehicleRoutes)
app.use('/api/users',userRoutes)
app.use('/api/users',reservationRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen to requests
        app.listen(process.env.PORT, () =>{
           console.log('connected to Db && listening on port', process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })

