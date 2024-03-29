//const nodemailer  = require('nodemailer')
const User = require ('../models/userModel')
const SiteReview = require ('../models/siteReviewModel')
const mongoose = require('mongoose')
const {transporter} = require('../mail')
const { unstable_renderSubtreeIntoContainer } = require('react-dom')

//process.env.SECRET;

//record a review
const recordSiteReview = async (req, res) => {

    // Basic validation (you might want to replace this with a more robust solution like Joi)
    const { userID, username, review, rating} = req.body;
    if (!userID || !username || !review || !rating) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const siteReview = new SiteReview({
            userID,
            username,
            review,
            rating
        });

        await siteReview.save();

        const user = await User.findById({_id: userID})
        const emailContent = 
       `<p>Dear  ${username} ,</p>
        <p>Your review has been taken into consideration</p>
        <p>Review Details:</p>
        <ul>
            <li>Rating: ${rating}</li>
            <li>Message: ${review}</li>
        </ul>
        <p>Thank you for your feedback.</p>`
    ;
    const mailOptions = {
        from: 'cosmiccoffeecrew@gmail.com',
        to: user.email,
        subject: 'Thanks for your review of our website',
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
        res.status(201).json(siteReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get reviews 

const getSiteReviews= async (req,res) => {
    const reviews = await SiteReview.find(req.query);
    res.status(200).json(reviews)
}

const getSiteReview = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such review'})
    }
    const review = await SiteReview.findById(id)

    if(!review){
        return res.status(404).json({error: 'No such review'})
    }
    res.status(200).json(review)
}



// }

module.exports = {recordSiteReview, getSiteReviews, getSiteReview}