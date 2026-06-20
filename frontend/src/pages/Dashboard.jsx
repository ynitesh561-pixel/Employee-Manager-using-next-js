import DashboardCards from "../components/DashboardCards";

function Dashboard({ employees }) {
  return (
    <div>
      <h1>Employee Management Dashboard</h1>
      <p>Manage employees and track records.</p>

      <DashboardCards employees={employees} />
    </div>
  );
}

export default Dashboard;