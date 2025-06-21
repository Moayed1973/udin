import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Leaderboard</Link>
      {user ? (
        <>
          <span>
            Welcome, {user.username} ({user.role})
          </span>
          <Link to="/dashboard">Dashboard</Link>
          {user.role === "admin" && <Link to="/admin">Admin Panel</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
