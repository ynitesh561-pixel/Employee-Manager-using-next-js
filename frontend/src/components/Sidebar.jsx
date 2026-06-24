import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaUserPlus, FaTasks } from "react-icons/fa";
import axios from "axios";

function Sidebar({ setToken, setEmployees }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      // OPTIONAL: backend logout call
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {
      console.log("Logout API error (ignored):", error);
    }

    // CLEAR EVERYTHING
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (setToken) setToken(null);
    if (setEmployees) setEmployees([]);

    // Redirect clean
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>

      <ul>
        <li>
          <NavLink to="/" end>
            <FaUsers /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/add-employee">
            <FaUserPlus /> Add Employee
          </NavLink>
        </li>

        <li>
          <NavLink to="/manage-employees">
            <FaTasks /> Manage Employees
          </NavLink>
        </li>

        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;