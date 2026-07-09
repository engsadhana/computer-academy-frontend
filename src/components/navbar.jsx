import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Shree Digital Computer Academy</h2>

      <ul>
        <li>
          <Link to="/students">Students</Link>
        </li>

        <li>
          <Link to="/courses">Courses</Link>
        </li>

        <li>
          <Link to="/enrolment">Enrolment</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;