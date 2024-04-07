const express = require('express')

const router = express.Router()

//controller functions
const{getBooking,cancelBooking, confirmBooking, updateBooking, recordBooking, getBookings, getUserBookings, getChauffeurBookings,deleteBooking, rateBooking }= require('../controllers/chauffeurBookingController')


//Confirm/Cancel reservation
router.patch('/cancel/:id',cancelBooking)
router.patch('/confirm/:id',confirmBooking)
//record route
router.post('/book', recordBooking)

//get all reservations route
router.get('/', getBookings)

//get all reservations route
router.get('/:id', getBooking)


//get a specific user's reservations
router.get('/user/:userID', getUserBookings)

//get a specific vehicle's reservations
router.get('/chauffeur/:chauffeurID',  getChauffeurBookings)

//Delete a reservation based on ID
router.delete('/:id', deleteBooking )

//Update reservation based on ID
router.patch('/:id',updateBooking)

router.patch('/rate/:id', rateBooking)
module.exports = router