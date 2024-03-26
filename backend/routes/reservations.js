const express = require('express')

const router = express.Router()

//controller functions
const{getReservation, checkInReservation,checkOutReservation,cancelReservation, confirmReservation, recordReservation, getReservations , getUserReservations, getVehicleReservations, deleteReservation, updateReservation, rateReservation}= require('../controllers/reservationController')

//CheckIn/CheckOut
router.patch('/checkin/:id',checkInReservation)
router.patch('/checkout/:id',checkOutReservation)

//Confirm/Cancel reservation
router.patch('/cancel/:id',cancelReservation)
router.patch('/confirm/:id',confirmReservation)
//record route
router.post('/record', recordReservation)

//get all reservations route
router.get('/', getReservations)

//get all reservations route
router.get('/:id', getReservation)


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