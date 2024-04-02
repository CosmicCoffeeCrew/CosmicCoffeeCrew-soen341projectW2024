const express = require('express')

const router = express.Router()

//controller functions
const{ getChauffeurs, getChauffeur, createChauffeur, deleteChauffeur, updateChauffeur}= require('../controllers/chauffeursController')


//get all Chauffeurs route
router.get('/',getChauffeurs)

//get a single Chauffeur route
router.get('/:id', getChauffeur)

//POST a new Vehicle
router.post('/', createChauffeur)

//delete a Chauffeur route
router.delete('/:id', deleteChauffeur)

//update a Chauffeur route
router.patch('/:id', updateChauffeur)




module.exports = router