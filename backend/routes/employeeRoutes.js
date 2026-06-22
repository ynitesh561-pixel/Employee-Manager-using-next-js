const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET ALL EMPLOYEES
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD EMPLOYEE
router.post("/", async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;

    if (!name || !email || !department || !salary) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const employee = new Employee({
      name,
      email,
      department,
      salary,
    });

    const savedEmployee = await employee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE EMPLOYEE
router.patch("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE EMPLOYEE
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(
      req.params.id
    );

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;