const Employee = require("../models/Employee");

// GET ALL EMPLOYEES
exports.getEmployees = async (req, res) => {
  try {
    const search = req.query.search || "";

    const employees = await Employee.find({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE EMPLOYEE
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD EMPLOYEE
exports.addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      salary,
      role,
    } = req.body;

    if (!name || !email || !department || !salary) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingEmployee = await Employee.findOne({
      email,
    });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      salary,
      role: role || "Employee",
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE EMPLOYEE
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee =
      await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
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
};

// DELETE EMPLOYEE
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee =
      await Employee.findByIdAndDelete(
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
};