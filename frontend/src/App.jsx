import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import ManageEmployees from "./pages/ManageEmployees";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [employees, setEmployees] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

 
  useEffect(() => {
    if (token) {
      fetchEmployees();
    }
  }, [token]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        window.location.href = "/login";
      }
    }
  };

  return (
    <BrowserRouter>
      <Routes>

       
        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

       
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={
              <Dashboard employees={employees} />
            }
          />

          {/* Add Employee */}
          <Route
            path="add-employee"
            element={
              <ProtectedRoute
                allowedRoles={["Admin", "Manager"]}
              >
                <AddEmployee
                  employees={employees}
                  setEmployees={setEmployees}
                />
              </ProtectedRoute>
            }
          />

          {/* Manage Employees */}
          <Route
            path="manage-employees"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "Manager",
                  "Employee",
                ]}
              >
                <ManageEmployees
                  employees={employees}
                  setEmployees={setEmployees}
                />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;