const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        enum: ["Customer", "CSR", "Admin"],
        required: true,
        default: "Customer"
    },
    //drivers License
    License: {
        type: String,
        required: true,
        unique: true
    },
    //birthdate
    birthdate: {
        type: Date,
        required: true,
    },
    rentalHistory: {
        type: Array,
        required: false
    }

})

// static sign up method

userSchema.statics.signup = async function(email, password, username, firstName, lastName, address, contactNumber, permission, License, birthdate, rentalHistory){


    // validation
    if (!email || !password || !username || !firstName || !lastName || !address || !contactNumber || !License || !birthdate){
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if (password.length < 8 || password.length > 20) {
        throw Error("Password must be betewen 8 and 20 characters long")
    }

    // Check if the password contains at least one special character, one capital letter,
    // one small letter, and one number
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const containsCapitalLetter = /[A-Z]/.test(password);
    const containsSmallLetter = /[a-z]/.test(password);
    const containsNumber = /\d/.test(password);

    // If all conditions are met, return true
    if ((containsSpecialChar && containsCapitalLetter && containsSmallLetter && containsNumber) == false){
        throw Error("Password must have at least: 1 Special Character, 1 Number, 1 Capital and Non-Capital Letter")
    }


    const email_Exists = await this.findOne({ email })

    const License_Exists = await this.findOne({ License })

    if (email_Exists){
        throw Error("Email already in use")
    }

    if (License_Exists){
        throw Error("Invalid License")
    }


    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hashPassword, username, firstName, lastName, address, contactNumber, permission, License, birthdate, rentalHistory})

    return user
}
userSchema.statics.login = async function(email, password){
   // validation
    if (!email || !password){
        throw Error("All fields must be filled")
    }

    const user_Exists = await this.findOne({ email })

    
    if (!user_Exists){
        throw Error("Incorrect Email or Password")
    }

    const match = await bcrypt.compare(password, user_Exists.password)

    if(!match){
        throw Error("Incorrect Email or Password")
    }

    return user_Exists

}
module.exports = mongoose.model('User', userSchema)