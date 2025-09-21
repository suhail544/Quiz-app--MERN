import { Link, useNavigate, useLocation } from 'react-router-dom';
import quizData from '../quizData.json';
import { useState } from 'react';

function Quiz() {
  const nav = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || "Anonymous";

  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState(Array(quizData.questions.length).fill(null));
  const [calcScore, setCalcScore] = useState(Array(quizData.questions.length).fill(false));

  const currentQuestion = quizData.questions[currentIndex];
  const len = quizData.questions.length;

  const handleAnswer = (i) => {
    const newAnswer = [...answer];
    newAnswer[currentIndex] = i;
    setAnswer(newAnswer);
  };
  
  const validate = (chosenAns, crtAns) => {
    const newScore = [...calcScore];

    if (chosenAns === crtAns && !calcScore[currentIndex]) {
      setScore(score + 1);
      newScore[currentIndex] = true;
    } else if (chosenAns !== crtAns && calcScore[currentIndex]) {
      setScore(score - 1);
      newScore[currentIndex] = false;
    }
    setCalcScore(newScore);
  };

  const nextBtn = () => {
    if(currentIndex + 1 < len){
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const backBtn = () => {
    if(currentIndex > 0){
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div className='quiz-page'>
        <div className='left'>
          <Link to='/'><button>Home</button></Link>
        </div>
        
        <div className='middle'>
          <h2>{currentIndex + 1}. {currentQuestion.question}</h2>
          {currentQuestion.options.map((opts, i) => (
            <ol  
              key={i}
              style={{
                backgroundColor: answer[currentIndex] === i ?  '#1E90FF' : 'transparent',
                color: answer[currentIndex] === i ? '#ffffff' : '#000000',
                borderRadius: answer[currentIndex] === i ? '30px' : ''
              }}
              onClick={() => {
                validate(opts, currentQuestion.correctAnswer);
                handleAnswer(i);
              }}
            >
              <li style={{color: answer[currentIndex] === i ? '#000000' : '#007acc'}}>
                {opts}
              </li>
            </ol>
          ))}
        </div>

        <div className='right'>
          {currentIndex > 0 && <button onClick={backBtn}>Back</button>}
          {currentIndex + 1 < len && <button onClick={nextBtn}>Next</button>}
        </div>         
      </div>

      <div className='submit'>
        {currentIndex + 1 === len && 
          <button onClick={() => nav('/result', { state: { score, userName } })}>
            Submit
          </button>
        }
      </div>
    </>
  );
}

export default Quiz;
