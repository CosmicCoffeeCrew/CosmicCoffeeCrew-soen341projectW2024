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

    const { make, model, year, type, color, mileage, transmission,location, fuelType, seats, pricePerDay, image, description } = req.body;
<<<<<<< HEAD

    // Check if required fields are present
    if (!make || !model || !year || !type || !color || !mileage || !transmission || !location || !fuelType || !seats || !pricePerDay || !image || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }
=======
>>>>>>> 7ffc7eadd8b38609eca287def9e7c740cc962835

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
            pricePerDay,
            image,
            description
        });
        //created vehicle in json format
        res.status(200).json(vehicle)

    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ message: "Internal server error" });
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

const availableVehicles = async (req,res) => {

const {startDate, endDate, location} = req.body
try{
let vehicles = await Vehicle.find()
let available = [];
let i =0
for (let vehicle of vehicles) {
  let reservations1 = await Reservation.find({ 
    vehicleID: vehicle._id,  
    start_Date: { $gte: startDate },
    end_Date: { $lte: endDate }
  })

  let reservations2 = await Reservation.find({ 
    vehicleID: vehicle._id,  
    start_Date: { $gte: startDate, $lte: endDate },
  })

  let reservations3 = await Reservation.find({ 
    vehicleID: vehicle._id,  
    end_Date: { $gte: startDate, $lte: endDate },
  })

  if (reservations1[0] == null && reservations2[0] == null && reservations3[0] == null ) {
    if(vehicle.location == location){
        available.push(vehicle);
    }
  }
i++
}
res.status(200).json(available)
return available
}
catch(error){
    res.status(400).json({error: "we are here"})
}
}


module.exports = { 
    getVehicles,
    getVehicle,
    createVehicle,
    deleteVehicle,
    updateVehicle,
    availableVehicles
}