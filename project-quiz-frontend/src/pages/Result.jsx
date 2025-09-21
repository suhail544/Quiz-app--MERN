import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const {score} = location.state || { score: 0 }
  return (
    <div className='result-page'>
      <h1 className='result'>Your score is : {score}</h1>
      <Link to='/'><button>Go to Home Page</button></Link>
    </div>
  )
}

export default Result