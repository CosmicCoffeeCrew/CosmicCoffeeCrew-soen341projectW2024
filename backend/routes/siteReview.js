const express = require('express')

const router = express.Router()

//controller functions
const{recordSiteReview, getSiteReviews, getSiteReview}= require('../controllers/siteReviewController')

//record route
router.post('/record', recordSiteReview)

//get all reservations route
router.get('/', getSiteReviews)

//get all reservations route
router.get('/:id', getSiteReview)

module.exports = router