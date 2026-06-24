import { useState } from "react";
import axios from "axios";

function ManageEmployees({ employees, setEmployees }) {
  const [search, setSearch] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // DELETE EMPLOYEE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees((prev) =>
        prev.filter((emp) => emp._id !== id)
      );

      setMessage("Employee Deleted Successfully");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log(error);
      setMessage("Delete Failed");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // OPEN EDIT
  const handleEdit = (employee) => {
    setEditEmployee({ ...employee });
  };

  // UPDATE EMPLOYEE
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/employees/${editEmployee._id}`,
        {
          name: editEmployee.name,
          email: editEmployee.email,
          department: editEmployee.department,
          salary: Number(editEmployee.salary),

          // NEW FIELDS
          role: editEmployee.role,
          phone: editEmployee.phone,
          address: editEmployee.address,
          status: editEmployee.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = employees.map((emp) =>
        emp._id === editEmployee._id
          ? res.data
          : emp
      );

      setEmployees(updated);
      setEditEmployee(null);

      setMessage("Employee Updated Successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log(error);
      setMessage("Update Failed");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // SEARCH
  const filteredEmployees = employees.filter((emp) =>
    `${emp.name || ""} ${emp.email || ""} ${emp.department || ""} ${emp.role || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="manage-container">
      <h2>Manage Employees</h2>

      {message && (
        <div className="success-toast">
          {message}
        </div>
      )}

      <input
        type="text"
        placeholder="Search Employee..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Role</th>
            <th>Status</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.status}</td>
                <td>₹{emp.salary}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editEmployee && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="form-header">
              <h3>Edit Employee</h3>

              <button
                className="close-btn"
                onClick={() => setEditEmployee(null)}
              >
                ✖
              </button>
            </div>

            <input
              type="text"
              value={editEmployee.name || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  name: e.target.value,
                })
              }
              placeholder="Name"
            />

            <input
              type="email"
              value={editEmployee.email || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <input
              type="text"
              value={editEmployee.department || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  department: e.target.value,
                })
              }
              placeholder="Department"
            />

            <input
              type="number"
              value={editEmployee.salary || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  salary: e.target.value,
                })
              }
              placeholder="Salary"
            />

            {/* ROLE */}
            <select
              value={editEmployee.role || "Employee"}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  role: e.target.value,
                })
              }
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>

            {/* STATUS */}
            <select
              value={editEmployee.status || "Active"}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  status: e.target.value,
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* PHONE */}
            <input
              type="text"
              value={editEmployee.phone || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  phone: e.target.value,
                })
              }
              placeholder="Phone"
            />

            {/* ADDRESS */}
            <input
              type="text"
              value={editEmployee.address || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  address: e.target.value,
                })
              }
              placeholder="Address"
            />

            <button onClick={handleUpdate}>
              Update Employee
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEmployees;