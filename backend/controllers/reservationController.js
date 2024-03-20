//Enrique: I modified this fild to implement the Email & Password Validation

const Reservation = require ('../models/reservationModel')
const mongoose = require('mongoose')
//process.env.SECRET;

//record a reservation
const recordReservation = async (req,res)=> {
    const {userID, vehicleID, start_Date, end_Date, charge, status} = req.body
    try{
        const reservation = await Reservation.record(userID, vehicleID, start_Date, end_Date, charge, status)

        res.status(200).json({userID, vehicleID, status})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//get reservations 

const getReservations= async (req,res) => {
    const reservations = await Reservation.find(req.query);
    res.status(200).json(reservations)
}
//Get reservations based on a specific vehicle ID
const getVehicleReservations = async (req, res) => {
    const { vehicleID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleID)) {
        return res.status(404).json({ error: 'Invalid vehicleID' });
    }

    try {
        const reservations = await Reservation.find({ vehicleID });

        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for this vehicleID' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get reservations based on a specific userID
const getUserReservations = async (req, res) => {
    
    const { userID } = req.params;
    

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ error: 'Invalid userID' });
    }

    try {
        const reservations = await Reservation.find({ userID });

        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for this userID' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update a reservation

const updateReservation = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndUpdate({_id: id},{
        ...req.body})

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)

}

// //login user
// const loginUser = async(req,res) => {
//     res.json({mssg: 'login user'})

// }


// //signup user
// const signupUser = async(req,res) => {
//     res.json({mssg: 'signup user'})

//Delete Reservation based on ID
const deleteReservation = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndDelete({_id: id})

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)

}


// }

module.exports = { updateReservation, recordReservation, getReservations, getUserReservations, getVehicleReservations,deleteReservation }