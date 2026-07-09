import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Students from "./pages/students";
import Courses from "./pages/Course";
import Enrolment from "./pages/enrolment";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Your other existing routes */}
        <Route path="/" element={<Students />} />

        {/* 3. Add your students route here */}
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrolment" element={<Enrolment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
