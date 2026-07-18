import React, { useState, useEffect } from "react";

function Enrolment() {
  const [enrolled_fee, setEnrolledFee] = useState("");
  const [discount_applied, setDiscount] = useState("");
  const [expected_course_end_date, setExpected_course_end_date] = useState("");
  const [enrolled_date, setEnrolled_date] = useState("");

  const [enrolments, setEnrolments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  //first useEffect

  useEffect(() => {
    getCourses();
    getStudents();
    getEnrollment();
  }, []);

  const getCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/courses");

      const data = await response.json();

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };
  // pull students list data
  const getStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/students");

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };
  //get enrollment
  const getEnrollment = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/enrollments");
      const data = await response.json();

      setEnrolments(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    // Validation

    if (!selectedStudent) {
      alert("Please select a student");
      return;
    }

    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }

    if (!enrolled_fee) {
      alert("Please enter enrolled fee");
      return;
    }

    if (!discount_applied) {
      alert("Please enter discount");
      return;
    }

    if (!expected_course_end_date) {
      alert("Please select expected course end date");
      return;
    }

    if (!enrolled_date) {
      alert("Please select enrolled date");
      return;
    }
    const data = {
      student_id: selectedStudent,

      course_id: selectedCourse,
      enrolled_fee: enrolled_fee,
      discount_applied: discount_applied,
      expected_course_end_date: expected_course_end_date,
      enrolled_date: enrolled_date,
    };

    const response = await fetch("http://127.0.0.1:8000/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const data2 = await response.json();

    if (response.ok) {
      setEnrolments([...enrolments, data2]);

      alert("Enrollment Successfully Added");

      setSelectedStudent("");
      setSelectedCourse("");
      setEnrolledFee("");
      setDiscount("");
      setExpected_course_end_date("");
      setEnrolled_date("");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Student Enrolment</h2>

      <div className="form-container">
        <label>Student ID</label>
        <br />

        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Course</label>
        <br />

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Enrolled Fee</label>
        <br />

        <input
          type="number"
          placeholder="Enter Course Fee"
          value={enrolled_fee}
          onChange={(e) => setEnrolledFee(e.target.value)}
        />

        <br />
        <br />

        <label>Discount Applied</label>
        <br />

        <input
          type="number"
          placeholder="Enter Discount"
          value={discount_applied}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <br />
        <br />

        <label>Expected Course End Date</label>
        <br />

        <input
          type="date"
          value={expected_course_end_date}
          onChange={(e) => setExpected_course_end_date(e.target.value)}
        />

        <br />
        <br />

        <label>Enrolled Date</label>
        <br />

        <input
          type="date"
          value={enrolled_date}
          onChange={(e) => setEnrolled_date(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleSubmit} type="button">
          Enroll Student
        </button>
      </div>

      <br />

      <h3>Enrollment List</h3>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Enrolled Fee</th>
            <th>Discount</th>
            <th>Expected End Date</th>
            <th>Enrolled Date</th>
          </tr>
        </thead>

        <tbody>
          {enrolments.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{item.student_id}</td>

              <td>{item.course_id}</td>

              <td>{item.enrolled_fee}</td>

              <td>{item.discount_applied}</td>

              <td>{item.expected_course_end_date}</td>

              <td>{item.enrolled_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Enrolment;
