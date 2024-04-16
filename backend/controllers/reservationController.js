// schedule is for autimatically firing an email at a time T (Mainly for reminders before reservations that the driver will be there)
const schedule = require('node-schedule');
const User = require ('../models/userModel')
const Vehicle = require ('../models/vehicleModel')
const Reservation = require ('../models/reservationModel')
const mongoose = require('mongoose')
const {transporter} = require('../mail')
const { unstable_renderSubtreeIntoContainer } = require('react-dom')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const fs2 = require('fs');


//record a reservation
const recordReservation = async (req, res) => {
    console.log("Attempting to record a reservation with body:", req.body);

    // Basic validation (you might want to replace this with a more robust solution like Joi)
    const { userID, vehicleID, start_Date, end_Date, status } = req.body;
    if (!userID || !vehicleID || !start_Date || !end_Date || !status) {
        console.error("Validation error: Missing fields in request body");
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Example of using the Reservation model to record a new reservation
        // This is pseudo-code; adjust according to your actual model and database schema

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

        if(daysDifference < 0){
            throw new Error("End date CANNOT be before the start date")
        }
        // Calculate the charge based on the vehicle's pricePerDay and the number of days
        
        const user = await User.findById({_id: userID})

        const charge = vehicle.pricePerDay * daysDifference;
        let creditsUsed = user.credits

        if(charge >= user.credits){
            await User.findOneAndUpdate({_id: userID}, {"credits": 0})
        }
        else{
            const newcreds = creditsUsed - charge
            await User.findOneAndUpdate({_id: userID}, {"credits": newcreds})
            creditsUsed = charge
        }

        const reservation = new Reservation({
            userID,
            vehicleID,
            start_Date,
            end_Date,
            charge,
            creditsUsed,
            status
        });

        await reservation.save();
        console.log("Reservation recorded successfully:", reservation);
        const emailContent = 
       `<p>Dear  ${user.username} ,</p>
        <p>Your reservation has been requested</p>
        <p>Reservation Details:</p>
        <ul>
            <li>Start Date: ${start_Date}</li>
            <li>End Date: ${end_Date}</li>
            <li>This reservation cost is: ${charge} CAD$ </li>
            <li>Your request is ${status}</li>
        </ul>
        <p>Thank you for choosing our service.</p>`
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'Reservation Request Received',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);

        

        // Example response; adjust as needed
        res.status(201).json(reservation);

    // Schedule reminder for new reservations that have been created after the server started running:
    {
        const {start_Date} = reservation;
        // Extract the date portion from the ISO string representation of the date
        console.log(start_Date)
    
        const bookingDateTime = new Date(start_Date); // Combine date_temp and time_temp strings into a Date object
    
            // Calculate the exact time one hour before the reservation
            const reminderDateTime = new Date(bookingDateTime.getTime() - (60 * 60 * 1000));
    
    
            // Check if the reminder time is in the future
            
                // Schedule a job to send the reminder email one hour before the reservation time
                const reminderJob = schedule.scheduleJob(reminderDateTime, async function() {
                    console.log(reminderDateTime);
                    await sendReminderEmail(reservation);
                    console.log(`Reminder email sent for reservation: ${reservation._id}`);
                    
                });
            
            }
          
    } catch (error) {
        console.error("Error recording reservation:", error);
        res.status(500).json({ error: error.message });
    }
};

//get reservations 

const getReservations= async (req,res) => {
    const reservations = await Reservation.find(req.query);
    res.status(200).json(reservations)
}

const getReservation = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }
    const reservation = await Reservation.findById(id)

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)
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
    const vehicle = await Vehicle.findById({_id: reservation.vehicleID})

    try{
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        const resId = reservation._id.toString()
        const pathTitle = "Rental Agreement { ".concat('', resId)
        const pathname = pathTitle.concat('', ' }.pdf')

        const startDate = new Date(reservation.start_Date);
        const endDate = new Date(reservation.end_Date);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24); // milliseconds to days

        var datetime = new Date();

        await page.setContent(
        `        

    <center><h1 style="font-family:verdana;"> Rental Contract </h1></center>
    <b><p style="margin: 0px 20px 0px 20px;">Rental Agreement Number: </b>${resId} </p><br>
    
    <p style="margin: 0px 20px 0px 20px;">This Rental Agreement ("Agreement") is entered into between CosmicCoffeeCrew, located at 1455 Blvd. De Maisonneuve OuestMontreal, QC H3G 1M8 , hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":</p>
        
       <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;" > 1. Renter's Information: </p></b>

        <p style="margin: 0px 20px 0px 20px;">Name: ${user.firstName} ${user.lastName}  </p>
        <p style="margin: 0px 20px 0px 20px;">Address: ${user.address}</p>
        <p style="margin: 0px 20px 0px 20px;">Contact Number: ${user.contactNumber}</p>
        <p style="margin: 0px 20px 0px 20px;">Email Address:  ${user.email}  </p>
        <p style="margin: 0px 20px 0px 20px;">Driver's License Number: ${user.License} </p>
        
        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;"> 2. Vehicle Information: </p></b>

        <p style="margin: 0px 20px 0px 20px;">Make: ${vehicle.make}</p>
        <p style="margin: 0px 20px 0px 20px;">Model:${vehicle.model}</p>
        <p style="margin: 0px 20px 0px 20px;">Year: ${vehicle.year}</p>
        <p style="margin: 0px 20px 0px 20px;">License Plate Number: ${vehicle.licensePlateNumber}</p>
        <p style="margin: 0px 20px 0px 20px;">Vehicle Identification Number (VIN): ${reservation.vehicleID}</p>
        <p style="margin: 0px 20px 0px 20px;">Color: ${vehicle.color}</p>

        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;">3. Rental Details:</p></b>

        <p style="margin: 0px 20px 0px 20px;">Rental Start Date: ${reservation.start_Date}</p>
        <p style="margin: 0px 20px 0px 20px;">Rental End Date:    ${reservation.end_Date}</p>
        <p style="margin: 0px 20px 0px 20px;">Pick-up Location: ${vehicle.location}</p>
        <p style="margin: 0px 20px 0px 20px;">Drop-off Location: ${vehicle.location}</p>
        <p style="margin: 0px 20px 0px 20px;">Rental Period: ${daysDifference} day(s) </p>
        <p style="margin: 0px 20px 0px 20px;">Mileage Limit (if applicable):</p>
        <p style="margin: 0px 20px 0px 20px;">Rental Rate: ${vehicle.pricePerDay}</p>
        <p style="margin: 0px 20px 0px 20px;">Additional Services (if any):</p>

        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;">4. Rental Terms and Conditions:</p></b>
        <ul>
        <li><p style="margin: 5px 20px 5px 2px;">The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.</p></li>
        <li><p style="margin: 5px 20px 5px 2px;">The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.</p></li>
        <li><p style="margin: 5px 20px 5px 2px;">The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.</p></li>
        <li><p style="margin: 5px 20px 5px 2px;">The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.</p></li>
        <li><p style="margin: 5px 20px 5px 2px;">The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.</p></li>
        <li><p style="margin: 5px 20px 5px 2px;">The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.</p></li>
        <li><p style="margin: 5px 20px 5px 2px;">The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.</p></li>
        <li><p style="margin: 5px 20px 5px 2px;">The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.</p></li>
        </ul>  
        <br><br><br><br><br><br><br><br>

        <b><p style="text-decoration: underline; margin: 50px 20px 10px 20px;">5. Indentification:</p></b>

        <p style="margin: 0px 20px 0px 20px;" >The Renter agrees to indentify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.</p>

        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;">6. Governing Law:</p></b>

        <p style="margin: 0px 20px 0px 20px;">This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].</p>

        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;">7. Entire Agreement:</p></b>

        <p style="margin: 0px 20px 0px 20px;">This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.</p>

        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;">8. Signatures:</p></b>

        <p style="margin: 0px 20px 20px 20px;" >The parties hereto have executed this Agreement as of the date first written above.</p>

        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;" >Rental Company:</p></b>

        <b><p style="margin: 0px 20px 5px 20px;" >Signature:</b> CoCoCrew</p>

        <b><p style="margin: 0px 20px 5px 20px;" >Print Name:</b> CoCoCrew</p>

        <b><p style="margin: 0px 20px 5px 20px;" >Date: </b>${datetime}</p>

        <b><p style="text-decoration: underline; margin: 10px 20px 10px 20px;" >Renter:</p></b>

        <b><p style="margin: 0px 20px 5px 20px;" >Signature: </b>___________________________</p>

        <b><p style="margin: 0px 20px 5px 20px;" >Print Name: </b>__________________________</p>

        <b><p style="margin: 0px 20px 5px 20px;" >Date: </b>_______________________________</p>

    `)
        await page.emulateMediaType("screen")
        const finalpdf = await page.pdf({
            path: pathname,
            format: 'A4',
            printBackground: true
        })

        await browser.close()
        pathtest = "./".concat(pathname)
        const mailOptions = {
            from: 'cosmiccoffeecrew@gmail.com',
            to: user.email,
            subject: 'Reservation Confirmation',
            attachments: [{
                filename: pathname,
                path: pathtest,
                contentType: 'application/pdf'
              }]
        };
    
        await transporter.sendMail(mailOptions);

        try {
            fs2.unlinkSync(pathtest);
            console.log('File is deleted.');
          } catch (err) {
            console.error(err);
          }


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

    //SENDING AN EMAIL TO SAY THAT 500 CAD have been withdrawed

    const user = await User.findById({_id: reservation.userID})
        const emailContent = 
       `<p>Dear  ${user.username} ,</p>
        <p>Thank you for using our services!</p>
        <h5>After carefully evaluating your reservation, we are sorry to announce that at this time we won't be able to provide you with the specific services you asked for. 
        For more information, please contact us at this email.</h5>

        
        <p>Thank you for your understanding, and we hope to see you soon!!</p>
        <p>CocoCrew</p>
        `
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'Reservation refused!',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);


    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)

}

//CHECKIN USER

const checkInReservation = async (req,res) => {
    const { id } = req.params
    const { inDamageReport } = req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndUpdate({_id: id},{'checkIn':true})
    const reservation2 = await Reservation.findOneAndUpdate({_id: id},{'inDamageReport':inDamageReport})
    //SENDING AN EMAIL TO SAY THAT 500 CAD have been withdrawed

    const user = await User.findById({_id: reservation.userID})
        const emailContent = 
       `<p>Dear  ${user.username} ,</p>
        <p>Thank you for checking In!</p>
        <h5>A deposit of 500 CAD$ has been taken from your account, and will be returned to you once you check-out.</h5>
        
        <p>Have a safe ride!</p>
        <p>CocoCrew</p>
        `
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'CHECK-IN',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);

    if(!reservation2){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation2)

}


//CHECK OUT
//CHECKIN USER

const checkOutReservation = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reservation'})
    }

    const reservation = await Reservation.findOneAndUpdate({_id: id},{'checkOut':true})

    //SENDING AN EMAIL TO SAY THAT 500 CAD have been withdrawed

    const user = await User.findById({_id: reservation.userID})
        const emailContent = 
       `<p>Dear  ${user.username} ,</p>
        
       <p>We hope you had a great experience, and wish to see you again soon!</p>
        <h3>Your 500 CAD$ deposit has been returned</h3>
        
        
        <p>We care about your opinion! Please take 2 minutes to leave a rating and a review :)</p>
        <p>CocoCrew</p>
        `
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'CHECK-OUT',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);

    if(!reservation){
        return res.status(404).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)

}




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
    uId = reservation.userID

    const user = await User.findById({_id: uId})

        const newnumofratings = vehicle.numOfRatings + 1
        const newtotalrating = vehicle.totalRating + rating
        const reviewobj = {
            userID: reservation.userID,
            username: user.username,
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

// Function to send email
async function sendReminderEmail(reservation) {
    // console.log(reservation);
    // console.log(reservation.userID);
    const user = await User.findById({_id: reservation.userID});
    // console.log(user.username);
    
    const emailContent = 
       `<p>Hi ${user.username},</p>

       <p>We hope this message finds you well!</p>
       
       <p>This is a reminder to come and check in as your rental reservation begins in an hour.</p>
       
       
       <p>If you have any questions or need to make any changes, feel free to reach out to us. We're here to assist you!</p>
       
       <p>Thank you for choosing Cosmic Coffee Crew. We're looking forward to serving you!</p>
       
       <p>Best regards,</p>
       <p>The Cosmic Coffee Crew Team</p>
       `;


    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'Car Rental Booking Reminder!',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
}
// IMPORTANT UNDERRRRRRRRRRRR 

async function reservationReminderEmails() {
    const reservations = await Reservation.find({}); // Get all bookings from MongoDB
    console.log("Got the reservations")

    const currentTime = new Date();

    reservations.forEach(reservation => {
        console.log("Went over this reservation: "+ reservation._id)
        const { start_Date } = reservation;
        
        // const bookingDateTime = new Date(datePortion + 'T' + time); // Combine date and time strings into a Date object
        const bookingDateTime = new Date(start_Date);
        // Calculate the exact time one hour before the reservation
        const reminderDateTime = new Date(bookingDateTime.getTime() - (60 * 60 * 1000));
        const currentTime = new Date();

        // Check if the reminder time is in the future
        if (reminderDateTime > currentTime) {
            console.log(`Reminder email scheduled for reservation: ${reservation._id}`);
            // Schedule a job to send the reminder email one hour before the reservation time
            const reminderJob = schedule.scheduleJob(reminderDateTime, async function() {
                await sendReminderEmail(reservation);
                console.log(`Reminder email sent for reservation: ${reservation._id}`);

                // Update reservation status to indicate that the reminder has been sent
                
                console.log("Reservation post sending the email: ", reservation);
            });
        }
    });
}


// }

module.exports = {reservationReminderEmails, getReservation, checkOutReservation,checkInReservation,cancelReservation, confirmReservation, updateReservation, recordReservation, getReservations, getUserReservations, getVehicleReservations,deleteReservation, rateReservation }
