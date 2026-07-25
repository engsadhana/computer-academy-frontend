import React, { useState, useEffect } from "react";

function Courses() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");

  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});

  return (
    <div className="container">
      <h2>Course List</h2>

      <div className="form-container">
        <label>Course Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <label>Duration</label>
        <br />
        <input
          type="text"
          placeholder="Example: 3 Months"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <br />
        <br />

        <label>Course Fee</label>
        <br />
        <input
          type="number"
          placeholder="Enter Course Fee"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
        />

        <br />
        <br />

        <button type="button">
          Add Course
        </button>
      </div>

      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Duration</th>
            <th>Fees</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>HTML</td>
            <td>1 Month</td>
            <td>2000</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Python</td>
            <td>3 Months</td>
            <td>6000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Courses;