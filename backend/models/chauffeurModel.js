const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require('validator')

const Schema = mongoose.Schema

const chauffeurSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true,
        enum: ['M', 'F'],
    },
    contactNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ['Montreal', 'Ottawa','Toronto','Vancouver','Halifax','Edmonton']
    },
    description: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    carMake: {
        type:String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carYear: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
     },
    totalRating: {
        type: Number,
        default: 0
    },
    reviews: [{
        userID: String,
        username: String,
        msg: String,
        rating: Number
    }]

})

module.exports = mongoose.model('Chauffeur', chauffeurSchema)
