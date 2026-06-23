import "./App.css";
import React, { use, Suspense } from 'react';
const fetchStudensPromise = fetch('http://127.0.0.1:8000/students')
  .then((res) => res.json());


function App() {
    const data = use(fetchStudensPromise);
  return (
    <div className="container">
      <h1>Shree Computer Academy</h1>

      <div className="cards">
        <div className="card">
          <h2>Students</h2>
          <p>Manage Students</p>
        </div>

        <div className="card">
          <h2>Courses</h2>
          <p>Manage Courses</p>
        </div>

        <div className="card">
          <h2>Admissions</h2>
          <p>Manage Enrollments</p>
        </div>
      </div>
      <ul>
      {data.map(student => (
        <li key={student.name}>{student.name}</li>
      ))}
    </ul>
    </div>
  );
}

export default App;