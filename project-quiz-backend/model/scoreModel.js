const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    totalScore: {
        type: Number,
        required: true,
    }
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score
