const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// All Logged-in Users
router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployeeById);

// Only Admin Can Add Employee
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  addEmployee
);


router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "Manager"),
  updateEmployee
);


router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "Manager"),
  deleteEmployee
);

module.exports = router;