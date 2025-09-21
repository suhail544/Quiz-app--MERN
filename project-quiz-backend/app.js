const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const app = express()

const quizRoute = require('./router/quizRouter')
const scoreRoute = require('./router/scoreRouter')


app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/quiz/question', quizRoute)
app.use('/api/quiz/score', scoreRoute)

module.exports = app