const express = require('express')
const router = express.Router()
const quizController = require('./../controller/quizController') 

router
    .route('/')
    .get(quizController.getAllQuestions)
    .post(quizController.createQuestion)

router 
    .route('/:id')
    .get(quizController.getQuestion)

module.exports = router;