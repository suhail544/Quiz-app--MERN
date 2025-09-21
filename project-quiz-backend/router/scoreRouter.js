const express = require('express')
const router = express.Router()
const quizController = require('./../controller/quizController') 

router
    .route('/')
    .post(quizController.saveScore)
    .get(quizController.getAllScores)

module.exports = router
