import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { saveScore } from '../api';

function Result() {
  const location = useLocation();
  const { score, userName } = location.state || { score: 0, userName: "Anonymous" };

  const handleSubmit = async () => {
  try {
    const response = await saveScore(userName, score);
    console.log("Saved successfully:", response.data);
    alert("Score saved successfully!");
  } catch (err) {
    if (err.response) {
      console.error("Backend error:", err.response.data);
      alert(`Failed to save score: ${err.response.data.message}`);
    } else {
      console.error("Error:", err.message);
      alert(`Failed to save score: ${err.message}`);
    }
  }
};


  return (
    <div className='result-page'>
      <h1 className='result'>Your score is : {score}</h1>

      <button onClick={handleSubmit}>Save Score</button>

      <Link to='/'><button>Go to Home Page</button></Link>
    </div>
  );
}

export default Result;
