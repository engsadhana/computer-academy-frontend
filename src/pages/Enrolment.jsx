import React, { useState,useEffect } from "react";


function Enrolment() {
  const [student_id, setStudentId] = useState("");
  const [course_id, setCourseId] = useState("");
  const [enrolled_fee, setEnrolledFee] = useState("");
  const [discount_applied, setDiscount] = useState("");
  const [expected_course_end_date, setExpected_course_end_date] = useState("");
  const [enrolled_date, setEnrolled_date] = useState("");

  const [enrolments, setEnrolments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  
  useEffect(() => {
    getCourses();
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

  const handleSubmit = () => {
    const data = {
      student_id: student_id,
      course_id: course_id,
      enrolled_fee: enrolled_fee,
      discount_applied: discount_applied,
      expected_course_end_date: expected_course_end_date,
      enrolled_date: enrolled_date,
    };

    setEnrolments([...enrolments, data]);

    alert("Enrollment Successfully Added");

    setStudentId("");
    setCourseId("");
    setEnrolledFee("");
    setDiscount("");
    setExpected_course_end_date("");
    setEnrolled_date("");
  };

  return (
    <div className="container">
      <h2>Student Enrolment</h2>

      <div className="form-container">
        <label>Student ID</label>
        <br />

        <input
          type="number"
          placeholder="Enter Student ID"
          value={student_id}
          onChange={(e) => setStudentId(e.target.value)}
        />

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

        <button onClick={handleSubmit} type="button">Enroll Student</button>
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
