import React, { useState, useEffect } from "react";


function Courses() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [fee, setFee] = useState("");
  const [duration_months, setDurationMonths] = useState("");
  const [description, setDescription] = useState("");

  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async () => {
    let validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Course Name is required";
    }

    if (!category.trim()) {
      validationErrors.category = "Category is required";
    }

    if (!fee) {
      validationErrors.fee = "Course Fee is required";
    }

    if (!duration_months) {
      validationErrors.duration_months = "Duration is required";
    }

    if (!description.trim()) {
      validationErrors.description = "Description is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const data = {
      name,
      category,
      fee: Number(fee),
      duration_months: Number(duration_months),
      description,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Course Added Successfully");

        setCourses([...courses, result]);

        setName("");
        setCategory("");
        setFee("");
        setDurationMonths("");
        setDescription("");
        setErrors({});
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

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
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <br />

        <label>Category</label>
        <br />
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={errors.category ? "input-error" : ""}
        />
        {errors.category && <p className="error">{errors.category}</p>}

        <br />

        <label>Course Fee</label>
        <br />
        <input
          type="number"
          placeholder="Enter Course Fee"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className={errors.fee ? "input-error" : ""}
        />
        {errors.fee && <p className="error">{errors.fee}</p>}

        <br />

        <label>Duration (Months)</label>
        <br />
        <input
          type="number"
          placeholder="Enter Duration in Months"
          value={duration_months}
          onChange={(e) => setDurationMonths(e.target.value)}
          className={errors.duration_months ? "input-error" : ""}
        />
        {errors.duration_months && (
          <p className="error">{errors.duration_months}</p>
        )}

        <br />

        <label>Description</label>
        <br />
        <textarea
          placeholder="Enter Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? "input-error" : ""}
        />
        {errors.description && (
          <p className="error">{errors.description}</p>
        )}

        <br />

        <button onClick={handleSubmit}>
          Add Course
        </button>
      </div>

      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Category</th>
            <th>Fee</th>
            <th>Duration</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.category}</td>
              <td>{course.fee}</td>
              <td>{course.duration_months}</td>
              <td>{course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;