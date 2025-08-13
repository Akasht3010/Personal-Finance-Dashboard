import { useAuth } from "../../contexts/AuthContext";
import "../../styles/App.css";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.email}</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">₹45,000</div>
          <div className="stat-label">Total Savings</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹12,500</div>
          <div className="stat-label">Investments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹3,000</div>
          <div className="stat-label">Monthly Expenses</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
