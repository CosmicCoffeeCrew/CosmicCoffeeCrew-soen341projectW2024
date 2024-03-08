const Vehicle = require('../models/vehicleModel')
const mongoose = require('mongoose')

// get all vehicles
const getVehicles = async (req,res) => {
    const vehicles = await Vehicle.find({}).sort({createdAt: -1})

    res.status(200).json(vehicles)
}

// get a single vehicle
const getVehicle = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such vehicle'})
    }
    const vehicle = await Vehicle.findById(id)

    if(!vehicle){
        return res.status(404).json({error: 'No such vehicle'})
    }
    res.status(200).json(vehicle)
}

// create a new vehicle
const createVehicle = async (req,res) => {

    const { make, model, year, type, color, mileage, transmission,location, fuelType, seats, pricePerDay } = req.body;

    // add doc to db
    try{
        const vehicle = await Vehicle.create({
            make,
            model,
            year,
            type,
            color,
            mileage,
            transmission,
            location,
            fuelType,
            seats,
            pricePerDay
        });
        //created vehicle in json format
        res.status(200).json(vehicle)

    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a vehicle
const deleteVehicle = async (req,res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such vehicle'})
    }

    const vehicle = await Vehicle.findOneAndDelete({_id: id})

    if(!vehicle){
        return res.status(404).json({error: 'No such vehicle'})
    }
    res.status(200).json(vehicle)

}

// update a vehicle
const updateVehicle = async (req,res) => {
    const { id } = req.params
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such vehicle'})
    }

    const vehicle = await Vehicle.findOneAndUpdate({_id: id},{
        ...req.body})

    if(!vehicle){
        return res.status(404).json({error: 'No such vehicle'})
    }
    res.status(200).json(vehicle)

}



module.exports = { 
    getVehicles,
    getVehicle,
    createVehicle,
    deleteVehicle,
    updateVehicle
}