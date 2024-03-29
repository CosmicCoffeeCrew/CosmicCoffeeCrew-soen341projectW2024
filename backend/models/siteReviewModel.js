const mongoose = require("mongoose")

const User = require ('./userModel')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})


reviewSchema.statics.record = async function(userID, username, review, rating){


    // validation
    if (!userID || !username || !review || !rating){
        throw Error("All fields must be filled")
    }
    const user_Exists = await User.findById(userID)

    if(!user_Exists){
        return res.status(404).json({error: 'No such User'})
    }

    const siteReview = await this.create({userID, username, review, rating})

    return siteReview
}
module.exports = mongoose.model('SiteReview', reviewSchema)