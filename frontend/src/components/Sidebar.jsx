import { NavLink } from "react-router-dom";
import { FaUsers, FaUserPlus, FaTasks } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>

      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaUsers /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-employee"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaUserPlus /> Add Employee
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/manage-employees"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaTasks /> Manage Employees
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;