import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import ManageEmployees from "./pages/ManageEmployees";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/employees/"
      );

      setEmployees(res.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard employees={employees} />
              }
            />

            <Route
              path="/add-employee"
              element={
                <AddEmployee
                  employees={employees}
                  setEmployees={setEmployees}
                />
              }
            />

            <Route
              path="/manage-employees"
              element={
                <ManageEmployees
                  employees={employees}
                  setEmployees={setEmployees}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;