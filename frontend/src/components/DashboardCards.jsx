function DashboardCards({ employees }) {
  return (
    <div className="cards">
      <div className="card">
        <h3>Total Employees</h3>
        <p>{employees.length}</p>
      </div>
    </div>
  );
}

export default DashboardCards;