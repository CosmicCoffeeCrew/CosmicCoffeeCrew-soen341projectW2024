const nodemailer  = require('nodemailer')
// schedule is for autimatically firing an email at a time T (Mainly for reminders before reservations that the driver will be there)
const schedule = require('node-schedule');
const User = require ('../models/userModel')
const Chauffeur = require ('../models/chauffeurModel')
const ChauffeurBooking = require ('../models/chauffeurBookingModel')
const mongoose = require('mongoose')
const {transporter} = require('../mail')
// const { unstable_renderSubtreeIntoContainer } = require('react-dom')

//process.env.SECRET;

//record a reservation
const recordBooking = async (req, res) => {
    console.log("Attempting to record a Booking with body:", req.body);

    // Basic validation (you might want to replace this with a more robust solution like Joi)
    const { userID, chauffeurID, date, time, location, dropOffLocation, pricePerHour, duration } = req.body;
    if (!userID || !chauffeurID || !date || !time ) {
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

        // Retrieve vehicle information to calculate pricePerHour
        const chauffeur = await Chauffeur.findById(chauffeurID);
        if (!chauffeur) {
            throw new Error('chauffeur not found');
        }

        // if(daysDifference < 0){
        //     throw new Error("End date CANNOT be before the start date")
        // }


        // Calculate the pricePerHour based on the vehicle's pricePerDay and the number of days
        
        const user = await User.findById({_id: userID})

        // const pricePerHour = vehicle.pricePerDay * daysDifference;
        // let creditsUsed = user.credits

        // if(pricePerHour >= user.credits){
        //     await User.findOneAndUpdate({_id: userID}, {"credits": 0})
        // }
        // else{
        //     const newcreds = creditsUsed - pricePerHour
        //     await User.findOneAndUpdate({_id: userID}, {"credits": newcreds})
        //     creditsUsed = pricePerHour
        // }
        let charge = 0;
        const booking = new ChauffeurBooking({
            userID,
            chauffeurID,
            date,
            time,
            location,
            dropOffLocation,
            pricePerHour,
            duration,
            charge
        });

        await booking.save();
        console.log("Booking recorded successfully:", booking);
        // console.log(duration,typeof(duration), chauffeur.pricePerHour)
        charge = parseInt(chauffeur.pricePerHour)  * parseInt(duration); 
        const booking_temp = await ChauffeurBooking.findOneAndUpdate({_id: booking._id},{
            charge})
    
        const emailContent = 
       `<p>Dear  ${user.username} ,</p>
        <p>Your Booking has been requested</p>
        <p>Chauffeur Booking Details:</p>
        <ul>
            <li>Your chauffeur will be: ${chauffeur.firstName} ${chauffeur.lastName}</li>
            <li>Date: ${date}</li>
            <li>Pickup time: ${time}</li>
            <li>Pickup location: ${location}</li>
            <li>Car Details: ${chauffeur.carMake} ${chauffeur.carModel} ${chauffeur.carYear}</li>
            <li>The total cost is: ${charge} CAD$ </li>
            
        </ul>
        <p>Thank you for choosing our service, we will get back to you soon.</p>`
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'Chauffeur Booking Request Received',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Schedule reminder for new reservations that have been created after the server started running:
    {
    const { date, time } = booking;
    // Extract the date portion from the ISO string representation of the date
    console.log(date)
const datePortion = date.toISOString().slice(0, 10);
const bookingDateTime = new Date(`${datePortion}T${time}`); // Combine date_temp and time_temp strings into a Date object

        // Calculate the exact time one hour before the booking
        const reminderDateTime = new Date(bookingDateTime.getTime() - (60 * 60 * 1000));


        // Check if the reminder time is in the future
        
            // Schedule a job to send the reminder email one hour before the booking time
            const reminderJob = schedule.scheduleJob(reminderDateTime, async function() {
                console.log(reminderDateTime);
                await sendReminderEmail(booking);
                console.log(`Reminder email sent for booking: ${booking._id}`);

                // Update booking status to indicate that the reminder has been sent
                booking.status = 'reminder-sent';
                await booking.save();
                console.log("Booking post sending the email: ", booking);
            });
        
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Example response; adjust as needed
        res.status(201).json(booking);
    } catch (error) {
        console.error("Error recording booking:", error);
        res.status(500).json({ error: error.message });
    }
};
// const recordReservation = async (req,res)=> {
//     const {userID, vehicleID, start_Date, end_Date, pricePerHour, status} = req.body
//     try{
//         const reservation = await Reservation.record(userID, vehicleID, start_Date, end_Date, pricePerHour, status)

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
//                 <li>pricePerHour: ${pricePerHour}</li>
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

//get Bookings 

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

//Get Bookings based on a specific vehicle ID
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


// Update a Booking

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
// //CONFIRM RESERVATION CSR

// const confirmBooking = async (req,res) => {
//     const { id } = req.params
    

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: 'No such booking'})
//     }

//     const booking = await ChauffeurBooking.findOneAndUpdate({_id: id},{'status':'accepted'})
//     const user = await User.findById({_id: booking.userID})

//     const emailContent = 
//     `<p>Dear  ${user.username} ,</p>
//      <p>Thank you for using our services!</p>
//      <h4>Your Chauffer Booking has been confirmed and you will meet at the chosen date, time, and location.
//      We hope you have a nice trip </h4>
//      <p>CocoCrew</p>
//      `
//  ;
//  const mailOptions = {
//      from: 'cosmiccoffeecrew@gmail.com',
//      to: user.email,
//      subject: 'Booking Confirmed!',
//      html: emailContent
//  };

//  await transporter.sendMail(mailOptions);


//     if(!booking){
//         return res.status(404).json({error: 'No such booking'})
//     }
//     res.status(200).json(booking)

// }

// //Cancel RESERVATION USER/CSR
// const cancelBooking = async (req,res) => {
//     const { id } = req.params
    

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: 'No such reservation'})
//     }

//     const booking = await chauffeurBooking.findOneAndUpdate({_id: id},{'status':'refused'})

//     //SENDING AN EMAIL TO SAY THAT 500 CAD have been withdrawed

//     const user = await User.findById({_id: booking.userID})
//         const emailContent = 
//        `<p>Dear  ${user.username} ,</p>
//         <p>Thank you for using our services!</p>
//         <h5>After carefully evaluating your Chauffeur booking, we are sorry to announce that at this time we won't be able to provide you with the specific services you asked for. 
//         For more information, please contact us at this email.</h5>

        
//         <p>Thank you for your understanding, and we hope to see you soon!!</p>
//         <p>CocoCrew</p>
//         `
//     ;
//     const mailOptions = {
//         from: 'cosmiccoffeecrew@gmail.com',
//         to: user.email,
//         subject: 'booking refused!',
//         html: emailContent
//     };

//     await transporter.sendMail(mailOptions);

//     ////////////////////////////////////////////////////////////

//     if(!booking){
//         return res.status(404).json({error: 'No such booking'})
//     }
//     res.status(200).json(booking)

// }




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

// Function to send email
async function sendReminderEmail(booking) {
    // console.log(booking);
    // console.log(booking.userID);
    const user = await User.findById({_id: booking.userID});
    // console.log(user.username);
    const chauffeur = await Chauffeur.findById({_id: booking.chauffeurID})
    const emailContent = 
       `<p>Hi ${user.username},</p>

       <p>We hope this message finds you well!</p>
       
       <p>We wanted to gently remind you about your upcoming chauffeur booking  with ${chauffeur.firstName} in an hour.</p>
       
       <p>The location will be ${booking.location} </p>
       
       <p>If you have any questions or need to make any changes, feel free to reach out to us. We're here to assist you!</p>
       
       <p>Thank you for choosing Cosmic Coffee Crew. We're looking forward to serving you!</p>
       
       <p>Best regards,</p>
       <p>The Cosmic Coffee Crew Team</p>
       `;


    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'Chauffeur Booking Reminder!',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
}

// async function scheduleReminderEmails() {
//     const bookings = await ChauffeurBooking.find({}); // Get all bookings from MongoDB

//     const currentTimePlusOneHour = new Date();
//     currentTimePlusOneHour.setHours(currentTimePlusOneHour.getHours() + 1); // Calculate current time plus one hour

//     bookings.forEach(booking => {
//         const { date, time } = booking;
//         const bookingDateTime = new Date(date + 'T' + time); // Combine date and time strings into a Date object

//         // Calculate the exact time one hour before the booking
//         const reminderDateTime = new Date(bookingDateTime.getTime() - (60 * 60 * 1000));

//         // Define a tolerance range (e.g., 1 minute)
//         const toleranceRange = 1 * 60 * 1000; // 1 minute in milliseconds

//         // Check if the current time is within the tolerance range of the reminder time
//         if (Math.abs(currentTimePlusOneHour.getTime() - reminderDateTime.getTime()) <= toleranceRange) {
//             // Schedule reminder job
//             const reminderJob = schedule.scheduleJob(reminderDateTime, async function() {
//                 await sendReminderEmail(booking);
//                 console.log(`Reminder email sent for booking: ${booking._id}`);
//                 // update booking status to see that it has been sent
                
//                 booking.status = 'reminder-sent';
//                 await booking.save();
//                 console.log("Booking post sending the email: ", booking)
//             });
//         }
//     });
// }



// IMPORTANT UNDERRRRRRRRRRRR 

async function scheduleReminderEmails() {
    const bookings = await ChauffeurBooking.find({}); // Get all bookings from MongoDB
    console.log("Got the bookings")

    const currentTime = new Date();

    bookings.forEach(booking => {
        // console.log("Went over this booking: "+ booking._id)
        const { date, time } = booking;
        const datePortion = date.toISOString().slice(0, 10);
        // const bookingDateTime = new Date(datePortion + 'T' + time); // Combine date and time strings into a Date object
        const bookingDateTime = new Date(`${datePortion}T${time}`);
        // Calculate the exact time one hour before the booking
        const reminderDateTime = new Date(bookingDateTime.getTime() - (60 * 60 * 1000));
        const currentTime = new Date();

        // Check if the reminder time is in the future
        if (reminderDateTime > currentTime) {
            // console.log(`Reminder email scheduled for booking: ${booking._id}`);
            // Schedule a job to send the reminder email one hour before the booking time
            const reminderJob = schedule.scheduleJob(reminderDateTime, async function() {
                await sendReminderEmail(booking);
                console.log(`Reminder email sent for booking: ${booking._id}`);

                // Update booking status to indicate that the reminder has been sent
                booking.status = 'reminder-sent';
                await booking.save();
                console.log("Booking post sending the email: ", booking);
            });
        }
    });
}






// Implement this function somewhere ( I m still looking where)
// // Call the scheduling function
// scheduleReminderEmails();


// }

module.exports = {scheduleReminderEmails, getBooking, updateBooking, recordBooking, getBookings, getUserBookings, getChauffeurBookings,deleteBooking, rateBooking }
// scheduleReminderEmails