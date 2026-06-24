function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <h2>Employee List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Salary</th>
            <th>Leave Balance</th>
            <th>Attendance</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.phone}</td>
                <td>{emp.status}</td>
                <td>₹{emp.salary}</td>
                <td>{emp.leaveBalance}</td>
                <td>{emp.attendanceCount}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;