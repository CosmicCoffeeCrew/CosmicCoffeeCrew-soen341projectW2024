const express = require('express')

const router = express.Router()

//controller functions
const{confirmReservation, declineReservation, cancelReservation, recordReservation, getReservations , getUserReservations, getVehicleReservations, deleteReservation, updateReservation, rateReservation}= require('../controllers/reservationController')

router.patch('/confirm/:id', confirmReservation)
router.patch('/decline/:id', declineReservation)
router.patch('/cancel/:id', cancelReservation)
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

router.patch('/rate/:id', rateReservation)
module.exports = router