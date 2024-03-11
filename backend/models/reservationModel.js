const mongoose = require("mongoose")

const User = require ('./userModel')
const Vehicle = require ('./vehicleModel')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    vehicleID: {
        type: String,
        required: true
    },
    start_Date: {
        type: Date,
        required: true
    },
    end_Date: {
        type: Date,
        required: true
    },
    charge: {
        type: String,    //make integer later
        required: true,
    }

})


reservationSchema.statics.record = async function(userID, vehicleID, start_Date, end_Date, charge){


    // validation
    if (!userID || !vehicleID || !start_Date || !end_Date || !charge){
        throw Error("All fields must be filled")
    }
    const user_Exists = await User.findById(userID)

    if(!user_Exists){
        return res.status(404).json({error: 'No such User'})
    }

    const vehicle_Exists = await Vehicle.findById(vehicleID)

    if(!vehicle_Exists){
        return res.status(404).json({error: 'No such Vehicle'})
    }


    const reservation = await this.create({userID, vehicleID, start_Date, end_Date, charge})

    return reservation
}
module.exports = mongoose.model('Reservation', reservationSchema)