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

  const [errors, setErrors] = useState({});

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

  const getStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    let newErrors = {};

    if (!selectedStudent) {
      newErrors.selectedStudent = "Please select a student";
    }

    if (!selectedCourse) {
      newErrors.selectedCourse = "Please select a course";
    }

    if (!enrolled_fee) {
      newErrors.enrolled_fee = "Please enter enrolled fee";
    } else if (Number(enrolled_fee) <= 0) {
      newErrors.enrolled_fee = "Fee must be greater than 0";
    }

    // Discount Optional
    if (discount_applied !== "") {
      if (Number(discount_applied) < 0) {
        newErrors.discount_applied = "Discount cannot be negative";
      } else if (Number(discount_applied) > Number(enrolled_fee)) {
        newErrors.discount_applied =
          "Discount cannot be greater than enrolled fee";
      }
    }

    if (!expected_course_end_date) {
      newErrors.expected_course_end_date = "Please select expected end date";
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
        <br />

        <select
          value={selectedStudent}
          onChange={(e) => {
            setSelectedStudent(e.target.value);
            setErrors({ ...errors, selectedStudent: "" });
          }}
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        {errors.selectedStudent && (
          <p style={{ color: "red", margin: "5px 0" }}>
            {errors.selectedStudent}
          </p>
        )}

        <br />

        <label>Course</label>
        <br />

        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setErrors({ ...errors, selectedCourse: "" });
          }}
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        {errors.selectedCourse && (
          <p style={{ color: "red", margin: "5px 0" }}>
            {errors.selectedCourse}
          </p>
        )}

        <br />

        <label>Enrolled Fee</label>
        <br />

        <input
          type="number"
          placeholder="Enter Course Fee"
          value={enrolled_fee}
          onChange={(e) => {
            setEnrolledFee(e.target.value);
            setErrors({ ...errors, enrolled_fee: "" });
          }}
        />

        {errors.enrolled_fee && (
          <p style={{ color: "red", margin: "5px 0" }}>{errors.enrolled_fee}</p>
        )}

        <br />

        <label>Discount Applied (Optional)</label>
        <br />

        <input
          type="number"
          placeholder="Enter Discount"
          value={discount_applied}
          onChange={(e) => {
            setDiscount(e.target.value);
            setErrors({ ...errors, discount_applied: "" });
          }}
        />

        {errors.discount_applied && (
          <p style={{ color: "red", margin: "5px 0" }}>
            {errors.discount_applied}
          </p>
        )}

        <br />

        <label>Expected Course End Date</label>
        <br />

        <input
          type="date"
          value={expected_course_end_date}
          onChange={(e) => {
            setExpected_course_end_date(e.target.value);
            setErrors({
              ...errors,
              expected_course_end_date: "",
            });
          }}
        />

        {errors.expected_course_end_date && (
          <p style={{ color: "red", margin: "5px 0" }}>
            {errors.expected_course_end_date}
          </p>
        )}

        <br />

        <label>Enrolled Date</label>
        <br />

        <input
          type="date"
          value={enrolled_date}
          onChange={(e) => {
            setEnrolled_date(e.target.value);
            setErrors({ ...errors, enrolled_date: "" });
          }}
        />

        {errors.enrolled_date && (
          <p style={{ color: "red", margin: "5px 0" }}>
            {errors.enrolled_date}
          </p>
        )}

        <br />

        <button type="button" onClick={handleSubmit}>
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
