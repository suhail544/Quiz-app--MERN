import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { saveScore, getQuestions } from "../api";

function Result() {
  const location = useLocation();
  const { score, userName } = location.state || { score: 0, userName: "Anonymous" };
  const [totalQuestions, setTotalQuestions] = React.useState(0);

  // Save score to backend
  useEffect(() => {
    const sendScore = async () => {
      try {
        await saveScore(userName, score);
      } catch (err) {
        console.error("Failed to save score:", err.message);
      }
    };

    sendScore();
  }, [userName, score]);

  // Get total number of questions
  useEffect(() => {
    const fetchTotalQuestions = async () => {
      try {
        const res = await getQuestions();
        setTotalQuestions(res.data.data.questions.length);
      } catch (err) {
        console.error("Failed to fetch total questions:", err.message);
      }
    };
    fetchTotalQuestions();
  }, []);

  return (
    <div className="result-page">
      <h1 className="result">
        Your score is: {score} / {totalQuestions}
      </h1>
      <Link to="/">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
}

export default Result;
