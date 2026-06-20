import { useState } from "react";
import axios from "axios";

function AddEmployee({ employees, setEmployees }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/employees/",
        {
          name,
          email,
          department,
          salary,
        }
      );

      setEmployees([...employees, res.data]);

      setMessage("Employee Added Successfully");

      setTimeout(() => {
        setMessage("");
      }, 2000);

      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
    } catch (error) {
      console.log(error);
      alert("Error adding employee");
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

        <button type="submit">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;