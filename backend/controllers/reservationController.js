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
    // Basic validation (you might want to replace this with a more robust solution like Joi)
    const { userID, vehicleID, start_Date, end_Date, charge, status } = req.body;
    if (!userID || !vehicleID || !start_Date || !end_Date || !charge || !status) {
        console.error("Validation error: Missing fields in request body");
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Example of using the Reservation model to record a new reservation
        // This is pseudo-code; adjust according to your actual model and database schema
        const reservation = new Reservation({
            userID,
            vehicleID,
            start_Date,
            end_Date,
            charge,
            status
        });

        await reservation.save();
        console.log("Reservation recorded successfully:", reservation);

        // Example response; adjust as needed
        res.status(201).json(reservation);
    } catch (error) {
        console.error("Error recording reservation:", error);
        res.status(500).json({ error: error.message });
    }
    //Email:
    //const {userID, vehicleID, start_Date, end_Date, status} = req.body
    try{
        // Calculate the difference in days between start_Date and end_Date
        const startDate = new Date(start_Date);
        const endDate = new Date(end_Date);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24); // milliseconds to days

        // Retrieve vehicle information to calculate charge
        const vehicle = await Vehicle.findById(vehicleID);
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }

        // Calculate the charge based on the vehicle's pricePerDay and the number of days
        const charge = vehicle.pricePerDay * daysDifference;

        //Recording the reservation 0w0 -----------------------------------------------------------------------
        const reservation = await Reservation.record(userID, vehicleID, start_Date, end_Date, charge, status)
        // Retrieve user's email
        const user = await User.findById({_id: userID});
        const userEmail = user.email;

        // Construct email content
        const emailContent = `
            <p>Dear ${user.username},</p>
            <p>Your reservation has been requested</p>
            <p>Reservation Details:</p>
            <ul>
                <li>Start Date: ${start_Date}</li>
                <li>End Date: ${end_Date}</li>
                <li>This reservation will cost you: ${charge} CAD$ </li>
                <li>Your request is ${status}</li>
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
res.status(200).json({ userID, vehicleID, status, charge, daysDifference });
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

module.exports = {confirmReservation, updateReservation, recordReservation, getReservations, getUserReservations, getVehicleReservations,deleteReservation, rateReservation }