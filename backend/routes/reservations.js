const express = require('express')

const router = express.Router()

//controller functions
const{confirmReservation, recordReservation, getReservations , getUserReservations, getVehicleReservations, deleteReservation, updateReservation}= require('../controllers/reservationController')

router.patch('/confirm/:id',confirmReservation)
//record route
router.post('/record', recordReservation)

//get all reservations route
router.get('/', getReservations)

//get a specific user's reservations
router.get('/user/:userID', getUserReservations)

//get a specific vehicle's reservations
router.get('/vehicle/:vehicleID',  getVehicleReservations)

//Delete a reservation based on ID
router.delete('/:id', deleteReservation )

//Update reservation based on ID
router.patch('/:id',updateReservation)
module.exports = router