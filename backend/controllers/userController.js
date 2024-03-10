//Enrique: I modified this fild to implement the Email & Password Validation

const User = require ('../models/userModel')
const jwt = require("jsonwebtoken")
//process.server.SECRET;
const createTocken = (id) => {
    jwt.sign({id}, process.server.SECRET , {expiresIn: '30d'}) //LOOK AT THE .ENV file
}

//login user
const loginUser = async(req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.login(email,password) //check

        //Create a tocken 
        const token = createTocken(user.id)

        //res.status(200).json({email, user})
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
    res.json ({mssg: 'login user'})
}

//signup user
//tocken authentification
const signupUser = async (req,res)=> {
    const {email,password} = req.body
    try{
        const user = await User.signup(email,password)

        //Create a tocken 
        const token = createTocken(user.id)

        //res.status(200).json({email, user})
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {signupUser, loginUser}
// //login user
// const loginUser = async(req,res) => {
//     res.json({mssg: 'login user'})

// }


// //signup user
// const signupUser = async(req,res) => {
//     res.json({mssg: 'signup user'})

// }

// modules.exports = { signupUser, loginUser}

 