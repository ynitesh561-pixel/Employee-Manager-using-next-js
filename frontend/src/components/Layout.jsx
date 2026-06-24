import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <div className="topbar">
          <div>
            <h3>
              Welcome, {user?.name || "User"}
            </h3>
            <p>{user?.role}</p>
          </div>

          
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Layout;