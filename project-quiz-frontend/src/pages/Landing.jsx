import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

function Landing() {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const handleStart = () => {
        if (!userName) {
            alert("Please enter your name");
            return;
        }
        // Navigate to Quiz page with userName
        navigate("/quiz", { state: { userName } });
    };

    return (
        <div className='landing-page'>
            <h1>LET'S START THE QUIZ!</h1>
            <div className='user-info'>
                <label>User Name:</label>
                <input 
                    className='user-name' 
                    type='text' 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            <button onClick={handleStart}>Start Quiz</button>
        </div>
    );
}

export default Landing;
