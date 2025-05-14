import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom' 
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        hello
        <Routes>
          hello
          <Route />
        </Routes>
      </div>
    </div>
  )
}

export default App