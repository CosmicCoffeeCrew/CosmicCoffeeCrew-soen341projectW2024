const nodemailer  = require('nodemailer')
const User = require ('../models/userModel')
const Vehicle = require ('../models/vehicleModel')
const Reservation = require ('../models/reservationModel')
const mongoose = require('mongoose')
const {transporter} = require('../mail')
const { unstable_renderSubtreeIntoContainer } = require('react-dom')
//process.env.SECRET;

//record a reservation
const recordReservation = async (req,res)=> {
    const {userID, vehicleID, start_Date, end_Date, charge, status} = req.body
    try{
        const reservation = await Reservation.record(userID, vehicleID, start_Date, end_Date, charge, status)
// ///////////////////////////////////////////////////////////////// EMAIL
        // Retrieve user's email
        const user = await User.findById(userID);
        const userEmail = user.email;

        // Construct email content
        const emailContent = `
            <p>Dear ${user.username},</p>
            <p>Your reservation has been successfully recorded.</p>
            <p>Reservation Details:</p>
            <ul>
                <li>Start Date: ${start_Date}</li>
                <li>End Date: ${end_Date}</li>
                <li>Charge: ${charge}</li>
                <li>Status: ${status}</li>
            </ul>
            <p>Thank you for choosing our service.</p>
        `;


        const mailOptions = {
            from: 'cosmiccoffeecrew@gmail.com',
            to: userEmail,
            subject: 'Reservation Confirmation',
            html: emailContent
        };

        await transporter.sendMail(mailOptions);
///////////////////////////////////////////////////////////////////////
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
//CONFIRM RESERVATION CSR

const confirmReservation = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndUpdate({_id: id},{'status':'accepted'})

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)

}

//DECLINE RESERVATION CSR

const declineReservation = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndUpdate({_id: id},{'status':'refused'})

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)

}

//CANCEL RESERVATION CSR

const cancelReservation = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndUpdate({_id: id},{'status':'canceled'})

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


const rateReservation = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    try{
    const reservation = await Reservation.findOneAndUpdate({_id: id}, {...req.body})

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }

    const {rating, review} = req.body
    vId = reservation.vehicleID
    const vehicle = await Vehicle.findById({_id: vId})

        const newnumofratings = vehicle.numOfRatings + 1
        const newtotalrating = vehicle.totalRating + rating
        const reviewobj = {
            userID: reservation.userID,
            msg: review,
            rating: rating
          }
        const newreviews = vehicle.reviews
        newreviews.push(reviewobj)


    const newV = await Vehicle.findOneAndUpdate({_id: vId}, {"numOfRatings": newnumofratings})
    const newV2 = await Vehicle.findOneAndUpdate({_id: vId}, {"totalRating": newtotalrating})
    const newV3 = await Vehicle.findOneAndUpdate({_id: vId}, {"reviews": newreviews})


    // , {"totalRating": newtotalrating}, {"reviews": newreviews}
        
    //, "totalRatings": newtotalrating, "reviews": newreviews
        res.status(200).json(reservation)
    }
    catch(error){
        res.status(400).json(error.message)
    }

}


// }

module.exports = {confirmReservation, declineReservation, cancelReservation, updateReservation, recordReservation, getReservations, getUserReservations, getVehicleReservations,deleteReservation, rateReservation }