import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout.jsx";
import { useAuth } from "../auth/AuthProvider.jsx";

const NavbarLanding = ({ hotelName = "Luxury Line Hotels",
                         hotelLink = "/",
                         browseLink = null,
                         browseLinkClassName = "",
                         loginLink = "/login",
                         logoutComponent = <Logout/>,
                         gradientClass = "silver-gradient",
                         hotelNameClassName = "text-white text-decoration-none" }) => {

  const { user } = useAuth();
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = (event) => {
    event.preventDefault();
    setShowAccount(!showAccount);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest(".dropdown-toggle") === null) {
      setShowAccount(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg px-5 ${gradientClass} shadow sticky-top`}>
      <div className="container-fluid">
        <a href={hotelLink} className={hotelNameClassName} style={{fontSize: "x-large", fontWeight: "400"}}>
          {hotelName}
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            {browseLink && (
              <li className="nav-item">
                <Link to={browseLink} className={`nav-link btn btn-link ${browseLinkClassName}`} style={{marginLeft: "10px"}}>
                  Browse rooms
                </Link>
              </li>
            )}
            {browseLink && user?.roles?.includes("ROLE_ADMIN") && (
              <>
                <li className="nav-item">
                  <Link to="/" className={`nav-link btn btn-link ${browseLinkClassName}`} style={{marginLeft: "-7px"}}>
                    Super Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="d-flex navbar-nav" style={{paddingRight: "20px"}}>
            <li className="nav-item dropdown">
              <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                 href="#"
                 role="button"
                 data-bs-toggle="dropdown"
                 aria-expanded={showAccount}
                 onClick={handleAccountClick}>Account
              </a>
              <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby="navbarDropdown">
                {user ? logoutComponent : (
                  <li>
                    <Link className="dropdown-item" to={loginLink}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;