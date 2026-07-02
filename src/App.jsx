import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Students from './pages/students'
import Navbar from "./components/navbar";

function App() {
 

  return (
    <BrowserRouter>
     <Navbar /> 
      <Routes>
        {/* Your other existing routes */}
        <Route path="/" element={<Students />} />
        
        {/* 3. Add your students route here */}
        <Route path="/students" element={<Students />} />
      </Routes>
    </BrowserRouter>
  
    
  );
}

export default App;
