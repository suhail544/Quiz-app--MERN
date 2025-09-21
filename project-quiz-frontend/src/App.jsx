import React from 'react'
import Landing from './pages/Landing'
import './App.css'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import { Routes, Route, Link} from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}  />
        <Route path='/quiz' element={<Quiz/>}  />
        <Route path='/result' element={<Result/>}  />
      </Routes>
    

    </>
  )
}

export default App