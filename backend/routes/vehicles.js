const express = require('express')

const router = express.Router()

const {
    createVehicle,
    getVehicles,
    getVehicle,
    deleteVehicle,
    updateVehicle,
    filterVehicles
} = require('../controllers/vehicleController.js')

// GET all Vehicles
router.get('/', getVehicles)

// GET a single Vehicle
router.get('/:id', getVehicle)

//POST a new Vehicle
router.post('/',createVehicle)

//DELETE a Vehicle
router.delete('/:id', deleteVehicle)

//UPDATE a Vehicle
router.patch('/:id',updateVehicle)

router.post('/filter', filterVehicles)

module.exports = router