import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../utilities/APIfunctions.js";
import NavbarLanding from "../admin/NavbarLanding.jsx";
import FooterLanding from "../admin/FooterLanding.jsx";

const Registration = ({
                          title = "Register your new account",
                          successMessageDefault = "Registration successful!",
                          errorMessageDefault = "An error occurred during registration.",
                          loginRedirectPath = "/login",
                          navbar: Navbar = NavbarLanding,
                          footer: Footer = FooterLanding,
                      }) => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistration({ ...registration, [name]: value });

        switch (name) {
            case "firstName":
                setValidationErrors({
                    ...validationErrors,
                    firstName: value ? "" : "First name is required."
                });
                break;
            case "lastName":
                setValidationErrors({
                    ...validationErrors,
                    lastName: value ? "" : "Last name is required."
                });
                break;
            case "email":
                setValidationErrors({
                    ...validationErrors,
                    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? ""
                        : "Enter a valid email address."
                });
                break;
            case "password":
                setValidationErrors({
                    ...validationErrors,
                    password: value.length >= 6
                        ? ""
                        : "Password must be at least 6 characters."
                });
                break;
            case "confirmPassword":
                setValidationErrors({
                    ...validationErrors,
                    confirmPassword: value === registration.password
                        ? ""
                        : "Passwords do not match."
                });
                break;
            default:
                break;
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registration.password !== registration.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        const hasErrors = Object.values(validationErrors).some((error) => error);
        if (hasErrors) {
            setErrorMessage("Please fix the validation errors.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("firstName", registration.firstName);
            formData.append("lastName", registration.lastName);
            formData.append("email", registration.email);
            formData.append("password", registration.password);
            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }

            const result = await registerUser(formData);
            setSuccessMessage(successMessageDefault);
            setErrorMessage("");

            setRegistration({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            setProfilePicture(null);
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`${errorMessageDefault}: ${error.message}`);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <>
            {Navbar && <Navbar />}
            <section className="container mt-4 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-4">{title}</h2>
                        <hr />
                        {successMessage && (
                            <div className="alert alert-success fade show">{successMessage}</div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show">{errorMessage}</div>
                        )}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label mt-2">
                                    First Name:
                                </label>
                                <input onChange={handleInputChange}
                                       id="firstName"
                                       name="firstName"
                                       type="text"
                                       className="form-control"
                                       value={registration.firstName}
                                       required
                                />
                                {validationErrors.firstName && (
                                    <small className="text-danger">{validationErrors.firstName}</small>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name:
                                </label>
                                <input onChange={handleInputChange}
                                       id="lastName"
                                       name="lastName"
                                       type="text"
                                       className="form-control"
                                       value={registration.lastName}
                                       required
                                />
                                {validationErrors.lastName && (
                                    <small className="text-danger">{validationErrors.lastName}</small>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email:
                                </label>
                                <input onChange={handleInputChange}
                                       id="email"
                                       name="email"
                                       type="email"
                                       className="form-control"
                                       value={registration.email}
                                       required
                                />
                                {validationErrors.email && (
                                    <small className="text-danger">{validationErrors.email}</small>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <input onChange={handleInputChange} style={{ marginBottom: "7px" }}
                                       id="password"
                                       name="password"
                                       type="password"
                                       className="form-control"
                                       value={registration.password}
                                       required
                                />
                                {validationErrors.password && (
                                    <small className="text-danger">{validationErrors.password}</small>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password:
                                </label>
                                <input onChange={handleInputChange} style={{ marginBottom: "25px" }}
                                       id="confirmPassword"
                                       name="confirmPassword"
                                       type="password"
                                       className="form-control"
                                       value={registration.confirmPassword}
                                       required
                                />
                                {validationErrors.confirmPassword && (
                                    <small className="text-danger">{validationErrors.confirmPassword}</small>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="profilePicture" className="form-label">
                                    Profile Picture:
                                </label>
                                <input onChange={handleFileChange}
                                       id="profilePicture"
                                       name="profilePicture"
                                       type="file"
                                       className="form-control"
                                       accept="image/*"
                                />
                            </div>
                            <div>
                                <button className="uni-button green-button mt-3">
                                    Create Account
                                </button>
                                <br />
                                <hr style={{ marginTop: "30px" }} />
                                Already have an account?
                                <br />
                                <Link to={loginRedirectPath} className="btn btn-outline-primary mt-3">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {Footer && <Footer />}
        </>
    );
};

export default Registration;