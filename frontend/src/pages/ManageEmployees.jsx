import { useState } from "react";
import axios from "axios";

function ManageEmployees({ employees, setEmployees }) {
  const [search, setSearch] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [message, setMessage] = useState("");

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${id}`
      );

   
     setEmployees((prev) =>
  prev.filter((emp) => emp._id !== id)
);

      setMessage("Employee Deleted Successfully ");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log(error);
      setMessage("Delete Failed");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  
  const handleEdit = (employee) => {
    setEditEmployee({ ...employee });
  };

 
  const handleUpdate = async () => {
    try {
    const res = await axios.patch(
  `http://localhost:5000/api/employees/${editEmployee._id}`,
        {
          name: editEmployee.name,
          email: editEmployee.email,
          department: editEmployee.department,
          salary: Number(editEmployee.salary), 
        }
      );

   const updatedEmployees = employees.map((emp) =>
  emp._id === editEmployee._id ? res.data : emp
);
      setEmployees(updatedEmployees);
      setEditEmployee(null);

      setMessage("Employee Updated Successfully ");

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log(error);
      setMessage("Update Failed");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  
  const filteredEmployees = employees.filter((emp) =>
    `${emp.name || ""} ${emp.email || ""} ${emp.department || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Manage Employees</h2>

     
      {message && (
        <div className="success-toast">{message}</div>
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
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
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
          ))}
        </tbody>
      </table>

      
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
              placeholder="Name"
              value={editEmployee.name || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={editEmployee.email || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  email: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Department"
              value={editEmployee.department || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  department: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Salary"
              value={editEmployee.salary || ""}
              onChange={(e) =>
                setEditEmployee({
                  ...editEmployee,
                  salary: e.target.value,
                })
              }
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