import { useState } from "react";
import axios from "axios";

function AddEmployee({ employees, setEmployees }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("Employee");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/employees",
        {
          name,
          email,
          department,
          salary,
          role,
          phone,
          address,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees([...employees, res.data.employee || res.data]);

      setMessage("Employee Added Successfully");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
      setRole("Employee");
      setPhone("");
      setAddress("");
      setStatus("Active");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Error adding employee"
      );
    }
  };

  return (
    <div className="employee-form">
      <div className="form-header">
        <h2>Add Employee</h2>
      </div>

      {message && (
        <div className="success-toast">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;