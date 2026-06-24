import { useState } from "react";
import axios from "axios";

function AddEmployee({ employees, setEmployees }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  // NEW FIELDS (backend model sync)
  const [role, setRole] = useState("Employee");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!name.trim()) return setError("Please enter employee name");
    if (!email.trim()) return setError("Please enter email address");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return setError("Please enter a valid email");

    if (!department.trim()) return setError("Please enter department");
    if (!salary || Number(salary) <= 0)
      return setError("Please enter valid salary");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/employees",
        {
          name,
          email,
          department,
          salary: Number(salary),
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

      setEmployees((prev) => [
        ...prev,
        res.data.employee || res.data,
      ]);

      setMessage("Employee Added Successfully");
      setMessageType("success");

      // reset form
      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
      setRole("Employee");
      setPhone("");
      setAddress("");
      setStatus("Active");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.log(error.response?.data);

      setMessage(
        error.response?.data?.message ||
          "Failed to add employee"
      );
      setMessageType("error");

      setTimeout(() => setMessage(""), 3000);
    }
  };

  const setError = (msg) => {
    setMessage(msg);
    setMessageType("error");
  };

  return (
    <div className="employee-form">
      <div className="form-header">
        <h2>Add Employee</h2>
      </div>

      {message && (
        <div
          className={
            messageType === "success"
              ? "success-toast"
              : "error-toast"
          }
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* ADDRESS */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;