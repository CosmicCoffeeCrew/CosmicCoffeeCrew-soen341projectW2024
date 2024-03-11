//Enrique: I modified this fild to implement the Email & Password Validation

const Reservation = require ('../models/reservationModel')
const mongoose = require('mongoose')
//process.env.SECRET;

//record a reservation
const recordReservation = async (req,res)=> {
    const {userID, vehicleID, start_Date, end_Date, charge} = req.body
    try{
        const reservation = await Reservation.record(userID, vehicleID, start_Date, end_Date, charge)

        res.status(200).json({userID, vehicleID})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//get reservations 

const getReservations= async (req,res) => {
    const reservations = await Reservation.find({}).sort({createdAt: -1})

    res.status(200).json(reservations)
}


// //login user
// const loginUser = async(req,res) => {
//     res.json({mssg: 'login user'})

// }


// //signup user
// const signupUser = async(req,res) => {
//     res.json({mssg: 'signup user'})

// }

module.exports = { recordReservation, getReservations }