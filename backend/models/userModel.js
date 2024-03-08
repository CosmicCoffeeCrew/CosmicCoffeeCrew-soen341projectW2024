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
    permission: {
        type: String,
        enum: ["Customer", "CSR", "Admin"],
        required: true
    },
    //drivers License
    License: {
        type: String,
        required: true,
        unique: true
    }
})

// static sign up methid

userSchema.statics.signup = async function(email, password, permission, License){


    // validation
    if (!email || !password || !permission || !License){
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password is weak")
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

    const hashLicense = await bcrypt.hash(password, salt)


    const user = await this.create({email, password: hashPassword, permission, License: hashLicense})

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

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Incorrect Email or Password")
    }
    
    return user_Exists

}
module.exports = mongoose.model('User', userSchema)