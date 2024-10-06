import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Projects from './pages/Projects'
import About from './pages/about'

export default function App() {
  return (
    <BrowserRouter>
      <Routes> {/* Corrected from Routs to Routes */}
        <Route path="/ " element={<Home />} />
        <Route path="/singin" element={<Signin />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}
