

const nodemailer = require('nodemailer');

// Send email using Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        // user: 'cosmiccoffeecrew@gmail.com',
        // pass: '12345%$#@!Aa'
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,

    }
});

// Check if transporter is defined before exporting
if (transporter) {
    console.log("Transporter created successfully.");
    module.exports = { transporter };
} else {
    console.error("Transporter is not initialized properly.");
}

///////////////////////////// IGNORE WHAT FOLLOWS:
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// const nodemailer = require('nodemailer');
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//     service:  'gmail',
//     host: "smtp.gmail.com",
//     port:587,
//     secure: false,
//     auth: {
//         user:process.env.USER,
//         pass:process.env.APP_PASSWORD,
//     },
// });

// const mailOptions={
//     from: process.env.USER,
//     to:"ira.zhu.2003@gmail.com",
//     subject:"SENDING A MAIL FROM CCC BACKEND",
//     text:"Hi Irina how are youuu. Kifik habibi?",
//     html:"<p>Hi Irina how are youuu. Kifik habibi?</p>",
// }

// const sendMail = async(transporter,mailOptions)=>{
//     try{
//         await  transporter.sendMail(mailOptions);
//         console.log('Email  has been sent');
//     }catch(error){
//         console.error(error);
//     }
// }

// sendMail(transporter,mailOptions);
