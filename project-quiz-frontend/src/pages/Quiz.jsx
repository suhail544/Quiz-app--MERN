import { Link, useNavigate } from 'react-router-dom'
import quizData from '../quizData.json'
import { useState } from 'react'
import Result from './Result'
import { Navigate } from 'react-router-dom'

function Quiz() {
  const nav = useNavigate()
  const [score, setScore] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState(Array(quizData.questions.length).fill(null))
  const [calcScore, setCalcScore] = useState(Array(quizData.questions.length).fill(false))
  const currentQuestion = quizData.questions[currentIndex];
  const len = quizData.questions.length

  const handleAnswer = (i) => {
    const newAnswer = [...answer]
    newAnswer[currentIndex] = i
    setAnswer(newAnswer)    
  }
  
  const validate = (chosenAns, crtAns) => {
    const newScore = [...calcScore]

    if(chosenAns === crtAns && !calcScore[currentIndex]){
      console.log('correct')
      setScore(score+1) 
      newScore[currentIndex] = true
    } else if(chosenAns !== crtAns && calcScore[currentIndex]){
      setScore(score-1)
      newScore[currentIndex] = false
    }
    setCalcScore(newScore)
    console.log(calcScore[currentIndex])
  }
 
  const nextBtn = () => {
    if(currentIndex+1<len){
      setCurrentIndex(currentIndex + 1)
    }
  }
  
  const backBtn = () => {
    if(currentIndex > 0) {
      setCurrentIndex(currentIndex-1)
    }
  }

  return (
    <>
        <div className='quiz-page'>
          <div className='left'>
            <Link to='/'><button>Home</button></Link>
          </div>
          
          <div className='middle'>
            <h2>{currentIndex+1}. {currentQuestion.question}</h2>
            {
              currentQuestion.options.map((opts, i)=> {
                return(
                <ol  
                    key={i}
                  style={{
                    backgroundColor: answer[currentIndex] === i ?  '#1E90FF' : 'transparent',
                    color: answer[currentIndex] === i ? '#ffffff' : '#000000',
                    borderRadius: answer[currentIndex] === i ? '30px' : ''
                  }}
                  onClick={()=> {
                      validate(opts,currentQuestion.correctAnswer);
                      handleAnswer(i);
                    }
                  }
                >
                  <li style={{color: answer[currentIndex] === i ? '#000000' : '#007acc'}}>{opts}</li>
                </ol>)

              })
             
            }
            {/* { 
              quizData.questions.map((question) => {
                return(
                <div key={question.id}>
                  <h1>Question {question.id}</h1>
                  <h3>{question.question}</h3>
                  <ol>
                    {question.options.map((opt, i)=> {
                      return <li key={i}
                      onClick={() => validate(opt, question.correctAnswer)}
                      >{opt}</li>
                    })}
                  </ol>
                </div>
              )})
            } */}
            
            {/* <h1>Question 1</h1>
            <h3>Which of these is NOT a JavaScript framework/library?</h3>
            <ol>
            <li>React</li>
            <li>Angular</li>
            <li>Django</li>
            <li>Vue.js</li>
            </ol> */}

            

          </div>

          <div className='right'>
            
            {currentIndex>0? <button onClick={()=> {backBtn()}}>back</button>:''}
            {currentIndex+1<len? <button onClick={()=> {nextBtn()}}>Next</button>:''}
            
          </div>         
        </div>
        <div className='submit'
        >
            {currentIndex+1===len ? 
            <button onClick={() => nav('/result', {state:{score}})}>Submit</button>
            : ''}
        </div>
    </>
  )
}

export default Quiz