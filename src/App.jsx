import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Students from "./pages/students";
import Courses from "./pages/Course";
import Enrolment from "./pages/enrolment";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/students"
          element={
            <>
              <Navbar />
              <Students />
            </>
          }
        />

        <Route
          path="/courses"
          element={
            <>
              <Navbar />
              <Courses />
            </>
          }
        />

        <Route
          path="/enrolment"
          element={
            <>
              <Navbar />
              <Enrolment />
            </>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;