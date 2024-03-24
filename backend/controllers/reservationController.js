//const nodemailer  = require('nodemailer')
const User = require ('../models/userModel')
const Vehicle = require ('../models/vehicleModel')
const Reservation = require ('../models/reservationModel')
const mongoose = require('mongoose')
const {transporter} = require('../mail')
const { unstable_renderSubtreeIntoContainer } = require('react-dom')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
//process.env.SECRET;

//record a reservation
const recordReservation = async (req, res) => {
    console.log("Attempting to record a reservation with body:", req.body);

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
    const user = await User.findById({_id: reservation.userID})


    try{
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        const resId = reservation._id.toString()
        const pathTitle = "Rental Agreement { ".concat('', resId)
        const pathname = pathTitle.concat('', ' }.pdf')

        await page.setContent(""+
        "<h1>Hello</h1>"+
        
            
    "<h1>Rental Agreement Number: " + resId + "</h1>" +
    
    "<p>This Rental Agreement ('Agreement') is entered into between CosmicCoffeeCrew, located at 1455 Blvd. De Maisonneuve OuestMontreal, QC H3G 1M8 , hereinafter referred to as the 'Rental Company,' and the individual or entity identified below, hereinafter referred to as the 'Renter':</p>" +
        
       "<p> 1. Renter's Information: </p>" +

        "<p>Name: " + user.username + "</p>"+
        "<p>Address:" +  + "</p>"+
        "<p>Contact Number:" +  + "</p>"+
        "<p>Email Address:" + user.email + "</p>"+
        "<p>Driver's License Number: " + user.License + "</p>"
        /*
        2. Vehicle Information:

        Make:
        Model:
        Year:
        License Plate Number:
        Vehicle Identification Number (VIN):
        Color:
        3. Rental Details:

        Rental Start Date:
        Rental End Date:
        Pick-up Location:
        Drop-off Location:
        Rental Period:
        Mileage Limit (if applicable):
        Rental Rate:
        Additional Services (if any):
        4. Rental Terms and Conditions:

        The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
        The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
        The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
        The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
        The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
        The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
        The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
        The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.
        5. Indemnification:

        The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.

        6. Governing Law:

        This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].

        7. Entire Agreement:

        This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.

        8. Signatures:

        The parties hereto have executed this Agreement as of the date first written above.

        Rental Company:

        Signature: ___________________________

        Print Name: __________________________

        Date: _______________________________

        Renter:

        Signature: ___________________________

        Print Name: __________________________

        Date: _______________________________

    */)
        await page.emulateMediaType("screen")
        await page.pdf({
            path: pathname,
            format: 'A4',
            printBackground: true
        })

        console.log('done')
        await browser.close()
    }
    catch(error){
        console.log(error.message)
    }

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)

}

//Cancel RESERVATION USER/CSR
const cancelReservation = async (req,res) => {
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

module.exports = {cancelReservation, confirmReservation, updateReservation, recordReservation, getReservations, getUserReservations, getVehicleReservations,deleteReservation, rateReservation }