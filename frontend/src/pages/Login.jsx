import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

import {
  FaUsers,
  FaEnvelope,
  FaLock,
  FaEye,
  FaGoogle,
  FaGithub,
  FaWindows,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      const { token, user } = res.data;

      if (!token) {
        alert("Token not received from backend");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (setToken) setToken(token);

      navigate("/");
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Invalid credentials ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="user-icon">
          <FaUsers />
        </div>

        <h1>
          Welcome <span>Back!</span>
        </h1>

        <p>
          Login to your account and manage employees.
        </p>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <FaEye
              style={{ cursor: "pointer" }}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        {/* ✅ SIGNUP LINK FIXED HERE */}
        <div className="signup-link">
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{
                color: "#3b82f6",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* SOCIAL LOGIN */}
        <div className="social-login">
          <button>
            <FaGoogle />
          </button>
          <button>
            <FaWindows />
          </button>
          <button>
            <FaGithub />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="illustration-box">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/employee-management-4489935-3723275.png"
          alt="Employee Management"
        />

        <h2>Smart Employee Management</h2>
        <p>
          Add, manage and track employees easily.
        </p>
      </div>
    </div>
  );
}

export default Login;