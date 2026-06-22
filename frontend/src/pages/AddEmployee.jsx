import { useState } from "react";
import axios from "axios";

function AddEmployee({ employees, setEmployees }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!name.trim()) {
      setMessage("Please enter employee name");
      setMessageType("error");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter email address");
      setMessageType("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    if (!department.trim()) {
      setMessage("Please enter department");
      setMessageType("error");
      return;
    }

    if (!salary || Number(salary) <= 0) {
      setMessage("Please enter a valid salary");
      setMessageType("error");
      return;
    }

    try {
     const res = await axios.post(
  "http://localhost:5000/api/employees",
        {
          name,
          email,
          department,
          salary: Number(salary),
        }
      );

      setEmployees((prev) => [...prev, res.data]);

      setMessage("Employee Added Successfully");
      setMessageType("success");

      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");

      setTimeout(() => {
        setMessage("");
      }, 2000);

    } catch (error) {
      console.log("API Error:", error.response?.data);

      if (error.response?.data?.email) {
        setMessage(error.response.data.email[0]);
      } else if (error.response?.data?.name) {
        setMessage(error.response.data.name[0]);
      } else {
        setMessage("Failed to add employee");
      }

      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
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

        <button type="submit">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;