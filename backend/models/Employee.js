const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: 0,
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    attendanceCount: {
      type: Number,
      default: 0,
    },

    leaveBalance: {
      type: Number,
      default: 20,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);