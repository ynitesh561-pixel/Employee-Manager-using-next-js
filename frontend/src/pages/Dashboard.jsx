import DashboardCards from "../components/DashboardCards";

function Dashboard({ employees }) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Employee Management Dashboard</h1>

        {user && (
          <div className="welcome-box">
            <h3>Welcome, {user.name}</h3>
            <p>Role: {user.role}</p>
          </div>
        )}

        <p>
          Manage employees, track performance and records efficiently.
        </p>
      </div>

      <DashboardCards employees={employees || []} />
    </div>
  );
}

export default Dashboard;