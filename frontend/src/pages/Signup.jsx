import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Employee",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setToast({
        message: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      console.log("SIGNUP RESPONSE:", res.data);

    
      setToast({
        message: "Signup successful  ",
        type: "success",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Employee",
      });

      //  Redirect after 1.5 sec
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error);

      setToast({
        message:
          error.response?.data?.message ||
          "Signup failed",
        type: "error",
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        setToast({ message: "", type: "" });
      }, 2000);
    }
  };

  return (
    <div className="signup-container">

      
      {toast.message && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="signup-box">
        <h1>
          Create <span>Account</span>
        </h1>

        <p>Register new employee account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;