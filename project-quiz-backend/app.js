const express = require('express')
const morgan = require('morgan')

const app = express()

const quizRoute = require('./router/quizRouter')
const scoreRoute = require('./router/scoreRouter')

const cors = require('cors');
app.use(cors()); // allow all origins for development


app.use(express.json())
// app.use(morgan('dev'))
app.use('/api/quiz/question', quizRoute)
app.use('/api/quiz/score', scoreRoute)

module.exports = app