const express = require('express')

const router = express.Router()

//controller functions
const{ recordReservation, getReservations , getUserReservations, getVehicleReservations, deleteReservation, updateReservation}= require('../controllers/reservationController')

//record route
router.post('/record', recordReservation)

//get all reservations route
router.get('/', getReservations)

//get a specific user's reservations
router.post('/user/:userID', getUserReservations)

//get a specific vehicle's reservations
router.post('/vehicle/:vehicleID',  getVehicleReservations)

//Delete a reservation based on ID
router.delete('/:id', deleteReservation )

//Update reservation based on ID
router.patch('/:id',updateReservation)
module.exports = router