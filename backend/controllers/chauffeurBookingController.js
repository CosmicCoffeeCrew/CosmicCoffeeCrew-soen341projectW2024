//const nodemailer  = require('nodemailer')
const User = require ('../models/userModel')
const Chauffeur = require ('../models/chauffeurModel')
const ChauffeurBooking = require ('../models/chauffeurBookingModel')
const mongoose = require('mongoose')
const {transporter} = require('../mail')
const { unstable_renderSubtreeIntoContainer } = require('react-dom')

//process.env.SECRET;

//record a reservation
const recordBooking = async (req, res) => {
    console.log("Attempting to record a Booking with body:", req.body);

    // Basic validation (you might want to replace this with a more robust solution like Joi)
    const { userID, chauffeurID, date, time, pickUpLocation, dropOffLocation, charge, status } = req.body;
    if (!userID || !chauffeurID || !date || !time || !status) {
        console.error("Validation error: Missing fields in request body");
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Example of using the Reservation model to record a new reservation
        // This is pseudo-code; adjust according to your actual model and database schema

        // Calculate the difference in days between start_Date and end_Date
        // const startDate = new Date(start_Date);
        // const endDate = new Date(end_Date);
        // const timeDifference = endDate.getTime() - startDate.getTime();
        // const daysDifference = timeDifference / (1000 * 3600 * 24); // milliseconds to days

        // Retrieve vehicle information to calculate charge
        const chauffeur = await Chauffeur.findById(chauffeurID);
        if (!chauffeur) {
            throw new Error('chauffeur not found');
        }

        // if(daysDifference < 0){
        //     throw new Error("End date CANNOT be before the start date")
        // }


        // Calculate the charge based on the vehicle's pricePerDay and the number of days
        
        const user = await User.findById({_id: userID})

        // const charge = vehicle.pricePerDay * daysDifference;
        // let creditsUsed = user.credits

        // if(charge >= user.credits){
        //     await User.findOneAndUpdate({_id: userID}, {"credits": 0})
        // }
        // else{
        //     const newcreds = creditsUsed - charge
        //     await User.findOneAndUpdate({_id: userID}, {"credits": newcreds})
        //     creditsUsed = charge
        // }

        const booking = new ChauffeurBooking({
            userID,
            chauffeurID,
            date,
            time,
            pickUpLocation,
            dropOffLocation,
            charge,
            status
        });

        await booking.save();
        console.log("Booking recorded successfully:", booking);
        const emailContent = 
       `<p>Dear  ${user.username} ,</p>
        <p>Your Booking has been requested</p>
        <p>Chauffeur Booking Details:</p>
        <ul>
            <li>Start Date: ${chauffeur.firstName} ${chauffeur.lastName}</li>
            <li>Date: ${date}</li>
            <li>Pickup time: ${time}</li>
            <li>Pickup location: ${pickUpLocation}</li>
            <li>DropOff location: ${dropOffLocation}</li>
            <li>This total cost is: ${charge} CAD$ </li>
            <li>Your request is ${status}</li>
        </ul>
        <p>Thank you for choosing our service.</p>`
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'Chauffeur Booking Request Received',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);

        

        // Example response; adjust as needed
        res.status(201).json(booking);
    } catch (error) {
        console.error("Error recording booking:", error);
        res.status(500).json({ error: error.message });
    }
};
// const recordReservation = async (req,res)=> {
//     const {userID, vehicleID, start_Date, end_Date, charge, status} = req.body
//     try{
//         const reservation = await Reservation.record(userID, vehicleID, start_Date, end_Date, charge, status)

//         // Retrieve user's email
//         const user = await User.findById({_id: userID});
//         const userEmail = user.email;

//         // Construct email content
//         const emailContent = `
//             <p>Dear ${user.username},</p>
//             <p>Your reservation has been successfully recorded.</p>
//             <p>Reservation Details:</p>
//             <ul>
//                 <li>Start Date: ${start_Date}</li>
//                 <li>End Date: ${end_Date}</li>
//                 <li>Charge: ${charge}</li>
//                 <li>Status: ${status}</li>
//             </ul>
//             <p>Thank you for choosing our service.</p>
//         `;


//         const mailOptions = {
//             from: 'cosmiccoffeecrew@gmail.com',
//             to: userEmail,
//             subject: 'Reservation Confirmation',
//             html: emailContent
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(200).json({userID, vehicleID, status})
//     }catch(error){
//         res.status(400).json({error:error.message})
//     }
// }

//get reservations 

const getBookings= async (req,res) => {
    const bookings = await ChauffeurBooking.find(req.query);
    res.status(200).json(bookings)
}

const getBooking = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }
    const booking = await ChauffeurBooking.findById(id)

    if(!booking){
        return res.status(404).json({error: 'No such booking'})
    }
    res.status(200).json(booking)
}

//Get reservations based on a specific vehicle ID
const getChauffeurBookings = async (req, res) => {
    const { chauffeurID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chauffeurID)) {
        return res.status(404).json({ error: 'Invalid chauffeurID' });
    }

    try {
        const bookings = await ChauffeurBooking.find({ chauffeurID });

        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this chauffeurID' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get reservations based on a specific userID
const getUserBookings = async (req, res) => {
    
    const { userID } = req.params;
    

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ error: 'Invalid userID' });
    }

    try {
        const bookings = await ChauffeurBooking.find({ userID });

        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this userID' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update a reservation

const updateBooking = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    const booking = await ChauffeurBooking.findOneAndUpdate({_id: id},{
        ...req.body})

    if(!booking){
        return res.status(404).json({error: 'No such booking'})
    }
    res.status(200).json(booking)

}
//CONFIRM RESERVATION CSR

const confirmBooking = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    const booking = await ChauffeurBooking.findOneAndUpdate({_id: id},{'status':'accepted'})
    const user = await User.findById({_id: booking.userID})

    const emailContent = 
    `<p>Dear  ${user.username} ,</p>
     <p>Thank you for using our services!</p>
     <h5>Your Chauffer Booking has been confirmed and you will meet at the chosen date, time, and location.
     We hipe you have a nice trip </h5>
     <p>CocoCrew</p>
     `
 ;
 const mailOptions = {
     from: 'cosmiccoffeecrew@gmail.com',
     to: user.email,
     subject: 'Booking Confirmed!',
     html: emailContent
 };

 await transporter.sendMail(mailOptions);


    if(!booking){
        return res.status(404).json({error: 'No such booking'})
    }
    res.status(200).json(booking)

}

//Cancel RESERVATION USER/CSR
const cancelBooking = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const booking = await chauffeurBooking.findOneAndUpdate({_id: id},{'status':'refused'})

    //SENDING AN EMAIL TO SAY THAT 500 CAD have been withdrawed

    const user = await User.findById({_id: booking.userID})
        const emailContent = 
       `<p>Dear  ${user.username} ,</p>
        <p>Thank you for using our services!</p>
        <h5>After carefully evaluating your Chauffeur booking, we are sorry to announce that at this time we won't be able to provide you with the specific services you asked for. 
        For more information, please contact us at this email.</h5>

        
        <p>Thank you for your understanding, and we hope to see you soon!!</p>
        <p>CocoCrew</p>
        `
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'booking refused!',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);

    ////////////////////////////////////////////////////////////

    if(!booking){
        return res.status(404).json({error: 'No such booking'})
    }
    res.status(200).json(booking)

}




//Delete Reservation based on ID
const deleteBooking = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    const booking = await ChauffeurBooking.findOneAndDelete({_id: id})

    if(!booking){
        return res.status(404).json({error: 'No such booking'})
    }
    res.status(200).json(booking)

}


const rateBooking = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    try{
    const booking = await ChauffeurBooking.findOneAndUpdate({_id: id}, {...req.body})

    if(!booking){
        return res.status(404).json({error: 'No such booking'})
    }

    const {rating, review} = req.body
    cId = booking.chauffeurID
    const chauffeur = await Chauffeur.findById({_id: cId})
    uId = booking.userID

    const user = await User.findById({_id: uId})

        const newtotalrating = chauffeur.totalRating + rating
        const reviewobj = {
            userID: booking.userID,
            username: user.username,
            msg: review,
            rating: rating
          }
        const newreviews = chauffeur.reviews
        newreviews.push(reviewobj)


    const newC1 = await Chauffeur.findOneAndUpdate({_id: cId}, {"totalRating": newtotalrating})
    const newC2 = await Chauffeur.findOneAndUpdate({_id: cId}, {"reviews": newreviews})


        res.status(200).json(booking)
    }
    catch(error){
        res.status(400).json(error.message)
    }

}


// }

module.exports = {getBooking,cancelBooking, confirmBooking, updateBooking, recordBooking, getBookings, getUserBookings, getChauffeurBookings,deleteBooking, rateBooking }