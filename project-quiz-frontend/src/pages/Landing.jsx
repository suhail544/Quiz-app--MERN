import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }
    // Pass username to Quiz page
    navigate("/quiz", { state: { userName } });
  };

  return (
    <div className="landing-page">
      <h1>LET'S START THE QUIZ!</h1>
      <div className="user-info">
        <label>User Name:</label>
        <input
        className="user-name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        
      </div>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}

export default Landing;
