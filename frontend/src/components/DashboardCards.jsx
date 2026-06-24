function DashboardCards({ employees }) {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  const managers = employees.filter(
    (emp) => emp.role === "Manager"
  ).length;

  const admins = employees.filter(
    (emp) => emp.role === "Admin"
  ).length;

  const departments = [
    ...new Set(employees.map((emp) => emp.department)),
  ].length;

  const totalSalary = employees.reduce(
    (sum, emp) => sum + (emp.salary || 0),
    0
  );

  return (
    <div className="cards">
      <div className="card">
        <h3>Total Employees</h3>
        <p>{totalEmployees}</p>
      </div>

      <div className="card">
        <h3>Active Employees</h3>
        <p>{activeEmployees}</p>
      </div>

      <div className="card">
        <h3>Inactive Employees</h3>
        <p>{inactiveEmployees}</p>
      </div>

      <div className="card">
        <h3>Total Managers</h3>
        <p>{managers}</p>
      </div>

      <div className="card">
        <h3>Total Admins</h3>
        <p>{admins}</p>
      </div>

      <div className="card">
        <h3>Departments</h3>
        <p>{departments}</p>
      </div>

      <div className="card">
        <h3>Total Salary</h3>
        <p>₹{totalSalary.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default DashboardCards;