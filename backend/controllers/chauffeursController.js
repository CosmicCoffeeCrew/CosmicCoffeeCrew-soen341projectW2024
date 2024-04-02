//Enrique: I modified this fild to implement the Email & Password Validation

const Chauffeur = require ('../models/chauffeurModel')
const mongoose = require('mongoose')

//process.env.SECRET;

// Function to create a new user
const createChauffeur = async (req, res) => {
    const { email, firstName, lastName, age, sex, contactNumber, location, pricePerDay} = req.body;
    try {
        // Check if the required fields are provided
        if (!email || !firstName || !lastName || !age || !contactNumber || !sex || !location || !pricePerDay ) {
            throw new Error("All fields must be filled");
        }

        // Create the user
        const chauffeur = await Chauffeur.create({ email, firstName, lastName, age, sex, contactNumber, location, pricePerDay});

        // Return success response with token
        res.status(200).json({chauffeur});
    } catch (error) {
        // Return error response
        res.status(400).json({ error: error.message });
    }
}

//get all Chauffeur
const getChauffeurs= async (req,res) => {
    const chauffeurs = await Chauffeur.find(req.query)

    res.status(200).json(chauffeurs)
}

//get a single Chauffeur
const getChauffeur = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Chauffeur'})
    }
    const chauffeur = await Chauffeur.findById(id)

    if(!chauffeur){
        return res.status(404).json({error: 'No such Chauffeur'})
    }
    res.status(200).json(chauffeur)
}


// delete a Chauffeur
const deleteChauffeur = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Chauffeur'})
    }

    const chauffeur = await Chauffeur.findOneAndDelete({_id: id})

    if(!chauffeur){
        return res.status(404).json({error: 'No such Chauffeur'})
    }
    res.status(200).json(chauffeur)

}

// update a Chauffeur
const updateChauffeur = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Chauffeur'})
    }

    const chauffeur = await Chauffeur.findOneAndUpdate({_id: id},{
        ...req.body})

    if(!chauffeur){
        return res.status(404).json({error: 'No such Chauffeur'})
    }
    res.status(200).json(chauffeur)

}


module.exports = {createChauffeur, getChauffeurs, getChauffeur, deleteChauffeur, updateChauffeur }
