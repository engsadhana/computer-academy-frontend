import React, { useEffect, useState } from "react";


function Students() {

  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");


  useEffect(() => {

    fetch("http://127.0.0.1:8000/students")


      .then((res) => res.json())

      .then((data) => setStudents(data))

      .catch((err) => console.log(err));

  }, []);



  const createStudent = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/students",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

         body: JSON.stringify({
    name,
    dob: "2026-07-07",
    mobile,
    email,
    address: "abc",
    bio : "abc bio",
  }),


      }
    );


    const data = await response.json();


    console.log(data);



    // New student add hoga table me
    setStudents([
      ...students,
      data
    ]);



    // Form clear
    setName("");
    setEmail("");
    setMobile("");



    // Form close
    setShowForm(false);

  };



  return (

    <div className="container">


      <div className="student-header">

        <h2>Student List</h2>


        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Student
        </button>


      </div>




      {
        showForm && (

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



            <button onClick={createStudent}>
              Create
            </button>




            <button
              onClick={() => setShowForm(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>



          </div>

        )

      }





      <table>


        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Mobile</th>

          </tr>

        </thead>




        <tbody>


          {
            students.map((student) => (

              <tr key={student.id}>


                <td>
                  {student.id}
                </td>


                <td>
                  {student.name}
                </td>


                <td>
                  {student.email}
                </td>


                <td>
                  {student.mobile}
                </td>


              </tr>


            ))
          }


        </tbody>


      </table>



    </div>

  );

}


export default Students;