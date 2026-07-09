import React from "react";

function Courses() {
  return (
    <div className="container">
      <h2>Course List</h2>

      <table>
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