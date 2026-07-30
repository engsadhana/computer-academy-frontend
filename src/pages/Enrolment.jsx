import React, { useState, useEffect } from "react";

function Enrolment() {
  const [enrolled_fee, setEnrolledFee] = useState("");
  const [discount_applied, setDiscount] = useState("");

  const [expected_course_end_date, setExpected_course_end_date] = useState("");
  const [enrolled_date, setEnrolled_date] = useState("");

  const [enrolments, setEnrolments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCourses();
    getStudents();
    getEnrollment();
  }, []);

  const getCourses = async () => {
    const response = await fetch("http://127.0.0.1:8000/courses");
    const data = await response.json();
    setCourses(data);
  };

  const getStudents = async () => {
    const response = await fetch("http://127.0.0.1:8000/students");
    const data = await response.json();
    setStudents(data);
  };

  const getEnrollment = async () => {
    const response = await fetch("http://127.0.0.1:8000/enrollments");
    const data = await response.json();
    setEnrolments(data);
  };

  const handleSubmit = async () => {
    let newErrors = {};

    if (!selectedStudent) {
      newErrors.selectedStudent = "Please select student";
    }

    if (!selectedCourse) {
      newErrors.selectedCourse = "Please select course";
    }

    if (!enrolled_fee) {
      newErrors.enrolled_fee = "Please enter fee";
    }

    if (!expected_course_end_date) {
      newErrors.expected_course_end_date =
        "Please select expected course end date";
    }

    if (!enrolled_date) {
      newErrors.enrolled_date = "Please select enrolled date";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const data = {
      student_id: selectedStudent,
      course_id: selectedCourse,
      enrolled_fee,
      discount_applied,
      expected_course_end_date,
      enrolled_date,
    };

    const response = await fetch("http://127.0.0.1:8000/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      setEnrolments([...enrolments, result]);

      alert("Enrollment Successfully Added");

      setSelectedStudent("");
      setSelectedCourse("");
      setEnrolledFee("");
      setDiscount("");
      setExpected_course_end_date("");
      setEnrolled_date("");
      setErrors({});
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Student Enrolment</h2>

      <div className="form-container">
        <label>Student</label>

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

        {errors.selectedStudent && (
          <p style={{ color: "red" }}>{errors.selectedStudent}</p>
        )}

        <br />

        <label>Course</label>

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

        {errors.selectedCourse && (
          <p style={{ color: "red" }}>{errors.selectedCourse}</p>
        )}

        <br />

        <label>Enrolled Fee</label>

        <input
          type="number"
          placeholder="Enter Course Fee"
          value={enrolled_fee}
          onChange={(e) => setEnrolledFee(e.target.value)}
        />
        {errors.enrolled_fee && (
          <p style={{ color: "red" }}>{errors.enrolled_fee}</p>
        )}

        <br />

        <label>Discount Applied (Optional)</label>

        <input
          type="number"
          placeholder="Enter Discount"
          value={discount_applied}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <label>enrolled_date</label>
        <input
          type="date"
          value={enrolled_date}
          onChange={(e) => setEnrolled_date(e.target.value)}
        />

        {errors.enrolled_date && (
          <p style={{ color: "red" }}>{errors.enrolled_date}</p>
        )}

        <br />

        <label>Expected Course End Date</label>

        <input
          type="date"
          value={expected_course_end_date}
          onChange={(e) => setExpected_course_end_date(e.target.value)}
        />
        {errors.expected_course_end_date && (
          <p style={{ color: "red" }}>{errors.expected_course_end_date}</p>
        )}

        <br />

        <button onClick={handleSubmit}>Enroll Student</button>
      </div>

      <h3>Enrollment List</h3>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Fee</th>
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
