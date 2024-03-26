const Vehicle = require('../models/vehicleModel')
const Reservation = require('../models/reservationModel')
const mongoose = require('mongoose')

// get all vehicles
const getVehicles = async (req,res) => {
    const vehicles = await Vehicle.find(req.query)

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

    const { make, model, year, type, color, licensePlateNumber, mileage, transmission,location, fuelType, seats, pricePerDay, image, description } = req.body;


    // add doc to db
    try{
        const vehicle = await Vehicle.create({
            make,
            model,
            year,
            type,
            color,
            licensePlateNumber,
            mileage,
            transmission,
            location,
            fuelType,
            seats,
            pricePerDay,
            image,
            description
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

const filterVehicles = async (req,res) => {

    const {startDate, endDate, minpricePerDay =0, maxpricePerDay = 200, minseats = 1, location = "all", type = "all", color = "all", make = "all"} = req.body
    try{
    let vehicles = await Vehicle.find()
    let available = [];
    let i =0

    if(!startDate || !endDate){
        for (let vehicle of vehicles) {
            if(vehicle.pricePerDay > maxpricePerDay || vehicle.pricePerDay < minpricePerDay || vehicle.seats < minseats){
                continue
            }
            else{
                if((location == "all" || location == vehicle.location) && (type == "all" || vehicle.type == type) && (color == "all" || vehicle.color == color) && (make == "all" || vehicle.make == make)){
                    available.push(vehicle);
                }
                else{}

            i++
            
        }
            }
    }
    else{
            for (let vehicle of vehicles) {
            if(vehicle.pricePerDay > maxpricePerDay || vehicle.pricePerDay < minpricePerDay || vehicle.seats < minseats){
                continue
            }
            else{
            let reservations1 = await Reservation.find({ 
                vehicleID: vehicle._id,  
                start_Date: { $gte: startDate },
                end_Date: { $lte: endDate },
                status: "accepted"
            })
            
            let reservations2 = await Reservation.find({ 
                vehicleID: vehicle._id,  
                start_Date: { $gte: startDate, $lte: endDate },
                status: "accepted"
            })
            
            let reservations3 = await Reservation.find({ 
                vehicleID: vehicle._id,  
                end_Date: { $gte: startDate, $lte: endDate },
                status: "accepted"
            })
            if (reservations1[0] == null && reservations2[0] == null && reservations3[0] == null ) {

                if((location == "all" || location == vehicle.location) && (type == "all" || vehicle.type == type) && (color == "all" || vehicle.color == color) && (make == "all" || vehicle.make == make)){
                    available.push(vehicle);
                }
                else{}
            }
            i++
            
        }
            }
    }
    res.status(200).json(available)
    return available
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    getVehicles,
    getVehicle,
    createVehicle,
    deleteVehicle,
    updateVehicle,
    filterVehicles
}