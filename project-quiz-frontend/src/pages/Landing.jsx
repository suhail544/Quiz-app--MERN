import React from 'react'
import Quiz from './Quiz'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <>
            <div className='landing-page'>
                <h1>LET'S START THE QUIZ!</h1>
                <Link to='/quiz'><button>Start Quiz</button></Link>
            </div>
        </>
    )
}

export default Landing