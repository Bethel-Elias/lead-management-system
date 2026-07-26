import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContex";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Lead Manager
      </Link>

      <div className="text-white">
        <span className="me-3">
          {user?.name}({user?.role})
        </span>

        <Link className="btn btn-success me-2" to="/create-lead">
          Create Lead
        </Link>

        <Link className="btn btn-primary me-2" to="/leads">
          Leads
        </Link>

        {user?.role === "admin" && (
          <Link className="btn btn-warning me-2" to="/admin">
            Admin
          </Link>
        )}

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
