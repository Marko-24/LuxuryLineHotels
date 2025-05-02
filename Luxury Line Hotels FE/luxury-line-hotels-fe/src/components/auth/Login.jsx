import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";
import NavbarLanding from "../admin/NavbarLanding.jsx";
import FooterLanding from "../admin/FooterLanding.jsx";
import { loginUser } from "../utilities/APIfunctions.js";

const Login = ({  redirectUrl = "/",
                  registerLink = "/register",
                  navbar: Navbar = NavbarLanding,
                  footer: Footer = FooterLanding,
                  containerStyle = {} }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = useAuth();
  const location = useLocation();
  const finalRedirectUrl = location.state?.path || redirectUrl;

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const { token } = success;
      auth.login(token);
      navigate(finalRedirectUrl, { replace: true });
    } else {
        setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <>
      {Navbar && <Navbar/>}
      <section className="container col-6" style={{marginTop: "150px", marginBottom: "275px", ...containerStyle}}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {errorMessage && (
              <p className="alert alert-danger">{errorMessage}</p>
            )}
            <h2 style={{ marginBottom: "20px" }}>Login</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div>
                  <input onChange={handleInputChange}
                         id="email"
                         name="email"
                         type="email"
                         className="form-control"
                         value={login.email}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div>
                  <input onChange={handleInputChange} style={{marginBottom: "10px"}}
                         id="password"
                         name="password"
                         type="password"
                         className="form-control"
                         value={login.password}
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <br/>
                <div>
                  <hr className="mt-4"/>
                  <p>Don't have an account yet?</p>
                  <Link to={registerLink} className="uni-button green-button" style={{textDecoration: "none"}}>
                    Register for one here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {Footer && <Footer/>}
    </>
  );
};

export default Login;