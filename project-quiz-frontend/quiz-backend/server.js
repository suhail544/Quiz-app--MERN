const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://zetx2004:Dominics@vio1@cluster0.hnhoz8z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const Question = mongoose.model('Question', {
  question: String,
  options: [String],
  correctAnswer: String,
});

// Routes
app.get('/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

app.post('/questions', async (req, res) => {
  const newQ = new Question(req.body);
  await newQ.save();
  res.status(201).send('Question added');
});

app.listen(5000, () => console.log('Server running on port 5000'));
