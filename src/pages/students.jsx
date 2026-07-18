import React, { useEffect, useState } from "react";

function Students() {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  //first useEffect
  useEffect(() => {
    fetch("http://127.0.0.1:8000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err));
  }, []);

  //Second useEffect
  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.mobile.includes(search),
      ),
    );
  }, [search, students]);

  // Create Student
  const createStudent = async () => {
    
    const response = await fetch("http://127.0.0.1:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        dob,
        mobile,
        email,
        address,
        bio,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setStudents([...students, data]);

      setName("");
      setEmail("");
      setMobile("");
      setDob("");
      setAddress("");
      setBio("");

      setShowForm(false);

      alert("Student Added Successfully");
    } else {
      alert("Something went wrong");
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    const response = await fetch(`http://127.0.0.1:8000/students/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setStudents(students.filter((student) => student.id !== id));
      alert("Student Deleted Successfully");
    } else {
      alert("Failed to Delete Student");
    }
  };

  return (
    <div className="container">
      <div className="student-header">
        <h2>Student List</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Student
        </button>
        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="form-container">
          <h3>Add Student</h3>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Enter Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <br />
          <br />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Enter Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <br />
          <br />

          <button onClick={createStudent}>Create</button>

          <button
            onClick={() => setShowForm(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.mobile}</td>

              <td>
                <button onClick={() => editStudent(student)}>Edit</button>

                <button
                  onClick={() => deleteStudent(student.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
