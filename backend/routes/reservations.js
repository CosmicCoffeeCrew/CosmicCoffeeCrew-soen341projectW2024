const express = require('express')

const router = express.Router()

//controller functions
const{ recordReservation, getReservations }= require('../controllers/reservationController')

//record route
router.post('/record', recordReservation)

//get all reservations route
router.get('/', getReservations)

module.exports = router