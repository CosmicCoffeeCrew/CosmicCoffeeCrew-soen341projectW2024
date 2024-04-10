const mongoose = require("mongoose")

const User = require ('./userModel')
const Chauffeur = require("./chauffeurModel")
const Schema = mongoose.Schema

const chauffeurBookingSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    chauffeurID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dropOffLocation: {
        type: String
    },
    charge: {
        type: Number,
        required:true
    },
    duration: {
        type : Number
    },
// status was here!
    review: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },


})


chauffeurBookingSchema.statics.record = async function(userID, chauffeurID, date, time, location, dropOffLocation, charge, status,duration){


    // validation
    if (!userID || !chauffeurID || !date || !time ||!status ||!location||!duration ){
        throw Error("All fields must be filled")
    }
    const user_Exists = await User.findById(userID)

    if(!user_Exists){
        return res.status(404).json({error: 'No such User'})
    }

    const chauffeur_Exists = await Chauffeur.findById(chauffeurID)

    if(!chauffeur_Exists){
        return res.status(404).json({error: 'No such chauffeur'})
    }


    const chauffeurBooking = await this.create({userID, chauffeurID, date, time, pickUpLocation, dropOffLocation, charge, status, duration})

    return chauffeurBooking
}
module.exports = mongoose.model('ChauffeurBooking', chauffeurBookingSchema)
