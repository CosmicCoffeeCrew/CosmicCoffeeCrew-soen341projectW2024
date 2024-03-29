const mongoose = require("mongoose")

const User = require ('./userModel')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userID: {
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


reviewSchema.statics.record = async function(userID, review, ){


    // validation
    if (!userID || !review || !rating){
        throw Error("All fields must be filled")
    }
    const user_Exists = await User.findById(userID)

    if(!user_Exists){
        return res.status(404).json({error: 'No such User'})
    }

    const siteReview = await this.create({userID, review, rating})

    return siteReview
}
module.exports = mongoose.model('SiteReview', reviewSchema)