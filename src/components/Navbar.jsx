import { Link } from "react-router-dom";
import "../styles/Navbar.css";
const Navbar = () => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <span className="crown">♛</span>
        <div>
          <h2>Crown</h2>
          <small>Assurance</small>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/plans">Plans</Link>
        <Link to="/claims">Claims</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {!token ? (
        <div className="auth-buttons">
          <Link
            className="login-btn"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="register-btn"
            to="/register"
          >
            Get Insured
          </Link>
        </div>
      ) : (
        <div className="user-section">
          <span>
            Welcome, {user?.fullName}
          </span>

          <button
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;