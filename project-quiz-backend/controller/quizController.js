const Quiz = require('./../model/quizModel')
const Score = require('./../model/scoreModel')

exports.getAllQuestions = async (req,res)=> {
    try{
        const questions = await Quiz.find()
        res.status(200).json({
            status: 'success',
            data: {
                questions
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getQuestion = async (req,res)=> {
    try{
        const question = await Quiz.findById(req.params.id)
    
        res.status(200).json({
            status: 'sucess',
            data: {
                question
            }
        })
    } catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.createQuestion = async (req,res)=> {
    try{
        const newQuestion = await Quiz.create(req.body);
        
        res.status(201).json({
            status: 'success',
            data: {
                newQuestion
            }
        })
    } catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.saveScore = async (req,res) => { 
    try{
        const score = await Score.create(req.body)
        
        res.status(201).json({
            status: 'success',
            data: { score }
        })
    } catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getAllScores = async (req,res) => {
    try{
        const scores = await Score.find()
        
        res.status(201).json({
            status: 'success',
            data: { scores }
        })
    } catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}