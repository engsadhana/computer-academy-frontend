import React, { useState } from "react";

function Enrolment() {

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");

  const [enrolments, setEnrolments] = useState([]);


  const handleSubmit = () => {

    const data = {
      studentName: name,
      courseName: course,
      enrollmentDate: date
    };


    setEnrolments([
      ...enrolments,
      data
    ]);


    alert("Enrollment Successfully Added");


    setName("");
    setCourse("");
    setDate("");

  };


  return (
    <div className="container">

      <h2>Student Enrolment</h2>


      <div className="form-container">


        <label>Student Name</label>
        <br />

        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />


        <br />
        <br />


        <label>Select Course</label>
        <br />


        <select
          value={course}
          onChange={(e)=>setCourse(e.target.value)}
        >

          <option value="">
            Select Course
          </option>

          <option value="HTML">
            HTML
          </option>

          <option value="Python">
            Python
          </option>

          <option value="Java">
            Java
          </option>

          <option value="Tally">
            Tally
          </option>


        </select>


        <br />
        <br />


        <label>Enrollment Date</label>
        <br />


        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />


        <br />
        <br />


        <button onClick={handleSubmit}>
          Enroll Student
        </button>


      </div>


      <br />


      <h3>Enrollment List</h3>


      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Course</th>
            <th>Date</th>
          </tr>

        </thead>


        <tbody>


        {
          enrolments.map((item,index)=>(

            <tr key={index}>

              <td>{index + 1}</td>

              <td>
                {item.studentName}
              </td>

              <td>
                {item.courseName}
              </td>

              <td>
                {item.enrollmentDate}
              </td>

            </tr>

          ))
        }


        </tbody>


      </table>


    </div>
  );
}


export default Enrolment;