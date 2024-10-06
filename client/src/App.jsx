import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/signin';
import Dashboard from './pages/dashboard';
import Projects from './pages/Projects';
import About from './pages/about';
import Header from './components/Header';
import Signup from './pages/signup';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Removed extra space */}
        <Route path="/signin" element={<Signin />} /> {/* Corrected "singin" to "signin" */}
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
