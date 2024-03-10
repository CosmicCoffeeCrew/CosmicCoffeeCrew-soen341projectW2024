const MONGO_URI = 'mongodb+srv://cosmiccoffeecrew:kaicBr8bsVO5zK1a@cosmiccluster.ffvw5je.mongodb.net/?retryWrites=true&w=majority&appName=CosmicCluster'
const PORT = 4000
const SECRET= "AFgfsdHJHjlhLFJEWpiBDIgdDHldYTODIUgodluIDFGldJFD"
// remove mongo_URI and PORT and use them from the .env file but rn it s not working so i m keeping them here JAD A


require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const vehicleRoutes = require('./routes/vehicles')
const userRoutes = require('./routes/users')

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

// connect to db
mongoose.connect(MONGO_URI)
    .then(() => {
        // listen to requests
        app.listen(PORT, () =>{
           console.log('connected to Db && listening on port', PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })

