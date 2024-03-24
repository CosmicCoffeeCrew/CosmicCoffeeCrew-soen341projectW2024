//Enrique: I modified this fild to implement the Email & Password Validation

const User = require ('../models/userModel')
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const {transporter} = require('../mail')

//process.env.SECRET;
const createTocken = (id) => {
    return jwt.sign({id}, process.env.SECRET , {expiresIn: '30d'}) //LOOK AT THE .ENV file
}

// Function to create a new user
const createUser = async (req, res) => {
    const { email, password, username, permission, License, birthdate, rentalHistory } = req.body;
    try {
        // Check if the required fields are provided
        if (!email || !password || !username || !permission || !License ) {
            throw new Error("All fields must be filled");
        }

        // Create the user
        const user = await User.create({ email, password, username, permission, License, birthdate, rentalHistory });

        // Create a token
        const token = createToken(user._id);

        // Return success response with token
        res.status(200).json({ email, token });
    } catch (error) {
        // Return error response
        res.status(400).json({ error: error.message });
    }
}

//get all Users
const getUsers= async (req,res) => {
    const users = await User.find(req.query)

    res.status(200).json(users)
}

//get a single User
const getUser = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }
    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'No such User'})
    }
    res.status(200).json(user)
}


// delete a User
const deleteUser = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user){
        return res.status(404).json({error: 'No such User'})
    }
    res.status(200).json(user)

}

// update a User        //////////  MUST CHECK THAT THERE IS NO OTHER ACCOUNT WITH THE CHANGED EMAIL AND CHANGED LICENSE
const updateUser = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findOneAndUpdate({_id: id},{
        ...req.body})

    if(!user){
        return res.status(404).json({error: 'No such User'})
    }
    res.status(200).json(user)

}

//login user
const loginUser = async(req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.login(email,password) //check
        const tempId = user.id;

        //Create a tocken 
        const token = createTocken(user.id)

        //res.status(200).json({email, user})
        res.status(200).json({email, token, tempId})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//signup user
//tocken authentification
const signupUser = async (req,res)=> {
    const {email,password, username, permission, License, birthdate, rentalHistory} = req.body
    try{
        const user = await User.signup(email,password, username, permission, License, birthdate, rentalHistory)

        //Create a tocken 
        const token = createTocken(user.id)

        /////////////////////////////////////////////////////////////Email
        // ///////////////////////////////////////////////////////////////// EMAIL
        // Retrieve user's email
        
        const userEmail = user.email;

        // Construct email content
        const emailContent = `
    <p>Dear ${user.username},</p>
    <p>Welcome to Cosmic Coffee Crew  ZOOMVITERAPIDE Car Rental Company!</p>
    <p>We're thrilled to have you on board and excited to assist you in exploring the world with our range of high-quality vehicles.</p>
    <p>At Cosmic Coffee Crew, we pride ourselves on providing exceptional service and ensuring your journey is smooth and memorable.</p>
    <p>Whether you're planning a weekend getaway, a business trip, or an adventurous road trip, our fleet of vehicles is here to cater to your needs.</p>
    <p>Feel free to browse through our selection of vehicles and make your reservation conveniently through our website or mobile app.</p>
    <p>If you have any questions or need assistance, our friendly team is always here to help. Don't hesitate to reach out!</p>
    <p>Once again, welcome to the Cosmic Coffee Crew Car Rental family. We look forward to serving you!</p>
    <p>Best regards,</p>
    <p>The Cosmic Coffee Crew Car Rental Team</p>
`;



        const mailOptions = {
            from: 'cosmiccoffeecrew@gmail.com',
            to: userEmail,
            subject: 'Sign Up Confirmation',
            html: emailContent
        };

        await transporter.sendMail(mailOptions);
///////////////////////////////////////////////////////////////////////

        //res.status(200).json({email, user})
        res.status(200).json({email, token})

    }catch(error){
        res.status(400).json({error:error.message})
    }
}
// //login user
// const loginUser = async(req,res) => {
//     res.json({mssg: 'login user'})

// }


// //signup user
// const signupUser = async(req,res) => {
//     res.json({mssg: 'signup user'})

// }

module.exports = {createUser, signupUser, loginUser, getUsers, getUser, deleteUser, updateUser }
