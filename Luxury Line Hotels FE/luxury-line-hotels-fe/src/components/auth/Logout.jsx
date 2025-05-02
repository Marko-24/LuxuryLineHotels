import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const Logout = ({ profilePath = "/profile", redirectPath = "/" }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate(redirectPath);
    };

    return (
      <>
        <li>
          <Link className="dropdown-item" to={profilePath}>
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <button className="dropdown-item" onClick={handleLogoutClick}>
          Logout
        </button>
      </>
    );
};

export default Logout;