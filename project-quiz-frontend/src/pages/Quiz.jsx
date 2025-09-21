import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestions } from "../api";

function Quiz() {
  const location = useLocation();
  const { userName } = location.state || { userName: "Anonymous" };
  const nav = useNavigate();

  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [calcScore, setCalcScore] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestions();
        setQuestions(res.data.data.questions);
        setAnswer(Array(res.data.data.questions.length).fill(null));
        setCalcScore(Array(res.data.data.questions.length).fill(false));
      } catch (err) {
        console.error("Failed to fetch questions:", err.message);
      }
    };

    fetchQuestions();
  }, []);

  if (questions.length === 0) return <div>Loading questions...</div>;

  const currentQuestion = questions[currentIndex];
  const len = questions.length;

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
    if (currentIndex + 1 < len) setCurrentIndex(currentIndex + 1);
  };

  const backBtn = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <>
      <div className="quiz-page">
        <div className="left">
          <button onClick={() => nav("/")}>Home</button>
        </div>

        <div className="middle">
          <h2>
            {currentIndex + 1}. {currentQuestion.question}
          </h2>
          {currentQuestion.options.map((opts, i) => (
            <ol
              key={i}
              style={{
                backgroundColor: answer[currentIndex] === i ? "#1E90FF" : "transparent",
                color: answer[currentIndex] === i ? "#ffffff" : "#000000",
                borderRadius: answer[currentIndex] === i ? "30px" : "",
              }}
              onClick={() => {
                validate(opts, currentQuestion.correctAnswer);
                handleAnswer(i);
              }}
            >
              <li style={{ color: answer[currentIndex] === i ? "#000000" : "#007acc" }}>
                {opts}
              </li>
            </ol>
          ))}
        </div>

        <div className="right">
          {currentIndex > 0 && <button onClick={backBtn}>Back</button>}
          {currentIndex + 1 < len && <button onClick={nextBtn}>Next</button>}
        </div>
      </div>

      <div className="submit">
        {currentIndex + 1 === len && (
          <button
            onClick={() =>
              nav("/result", {
                state: { score, userName },
              })
            }
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}

export default Quiz;
