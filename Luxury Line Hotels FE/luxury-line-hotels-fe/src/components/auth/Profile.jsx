import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { format } from "date-fns";
import { useAuth } from "./AuthProvider.jsx";
import NavbarLanding from "../admin/NavbarLanding.jsx";
import FooterLanding from "../admin/FooterLanding.jsx";
import FindBooking from "../bookings/FindBooking.jsx";
import { getUser, getAllBookings, getBookingsByUserId, deleteUser, updateProfilePicture, deleteProfilePicture } from "../utilities/APIfunctions.js";

const Profile = ({ renderSettings = null,
                   renderBookingRow = null,
                   fetchAllBookings = false,
                   redirectUrl = "/",
                   navbar: Navbar = NavbarLanding,
                   footer: Footer = FooterLanding,
                   hotelNameFilter }) => {
    const { user, logout } = useAuth();
    const [profileUser, setProfileUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        roles: [{ id: "", name: "" }]
    });

    const [bookings, setBookings] = useState([]);
    const [message] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token);
                setProfileUser(userData);
            } catch (error) {
                console.error(error);
                setErrorMessage("Failed to fetch user details.");
            }
        };
        fetchUser();
    }, [userId, token]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setProfileUser((prev) => ({ ...prev, profilePicture: previewUrl }));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setErrorMessage("Please select a file.");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await updateProfilePicture(userId, formData, token);
            setSelectedFile(null);
            const updatedUser = await getUser(userId, token);
            setProfileUser(updatedUser);
        } catch (error) {
            setErrorMessage("Error uploading profile picture.");
        }
    };

    const handleDeletePicture = async () => {
        try {
            await deleteProfilePicture(userId, token);
            setProfileUser((prev) => ({ ...prev, profilePicture: "" }));
        } catch (error) {
            setErrorMessage("Error deleting profile picture.");
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                let response;
                if (fetchAllBookings) {
                    response = await getAllBookings(token);
                } else {
                    response = await getBookingsByUserId(userId, token);
                    if (hotelNameFilter) {
                        response = response.filter(booking => booking.room.hotelName === hotelNameFilter);
                    }
                }
                setBookings(response);
            } catch (error) {
                console.error("Error fetching bookings:", error.message);
                setErrorMessage(error.message);
            }
        };
        fetchBookings();
    }, [userId, fetchAllBookings]);

    const handleCancelBooking = async (bookingId) => {
        console.log(`Canceled booking with ID: ${bookingId}`);
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (confirmed) {
            try {
                await deleteUser(userId, token);
                logout();
                navigate(redirectUrl);
            } catch (error) {
                console.error("Failed to delete account:", error);
                setErrorMessage("Error deleting account.");
            }
        }
    };

    const formatDate = (date) => {
        try {
            return format(new Date(date), "d/M/yyyy");
        } catch (error) {
            console.error("Date formatting error:", error);
            return date;
        }
    };

    return (
        <section>
            {Navbar && <Navbar/>}
            <div className="container">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {message && <p className="text-success">{message}</p>}
                {profileUser ? (
                    <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                        <div className="card-body">
                            <div className="col-md-12 mx-auto">
                                <div className="card mb-3 shadow p-3">
                                    <h3 className="card-title text-center mt-2 mb-4">Account Information</h3>
                                    <div className="row g-0">
                                        <div className="col-md-2 text-center">
                                            <img src={profileUser.profilePicture ||
                                                      "https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"}
                                                 alt="Profile"
                                                 className="rounded-circle"
                                                 style={{width: "150px", height: "150px", objectFit: "cover"}}
                                            />
                                         <div className="d-flex justify-content-center mt-3">
                                            <input type="file"
                                                   accept="image/*"
                                                   onChange={handleFileChange}
                                                   id="fileInput"
                                                   style={{ display: "none" }}
                                            />
                                            {!selectedFile && (
                                                <button onClick={() => document.getElementById("fileInput").click()}
                                                        className="btn btn-primary mb-1"
                                                        style={{borderBottomRightRadius: "0px", borderTopRightRadius: "0px",
                                                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"}}>
                                                    Change
                                                </button>
                                            )}
                                            {selectedFile && (
                                                <button onClick={handleUpload} className="uni-button green-button mb-1"
                                                        style={{borderBottomRightRadius: "0px", borderTopRightRadius: "0px",
                                                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"}}>
                                                    Confirm
                                                </button>
                                            )}
                                            {profileUser.profilePicture && (
                                                <button onClick={handleDeletePicture} className="uni-button red-button mb-1"
                                                        style={{borderBottomLeftRadius: "0px", borderTopLeftRadius: "0px"}}>
                                                    Remove
                                                </button>
                                            )}
                                         </div>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="card-body">
                                                <p><strong>First Name:</strong> {profileUser.firstName}</p>
                                                <p><strong>Last Name:</strong> {profileUser.lastName}</p>
                                                <p><strong>Email:</strong> {profileUser.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3 shadow p-3">
                                    <h3 className="card-title text-center mt-2 mb-4">Booking History</h3>
                                    {bookings.length > 0 ? (
                                        <table className="table table-bordered text-center">
                                            <thead>
                                            <tr>
                                                <th>Hotel</th>
                                                <th>Room Type</th>
                                                <th>Check In Date</th>
                                                <th>Check Out Date</th>
                                                <th>Adults</th>
                                                <th>Children</th>
                                                <th>Confirmation Code</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {bookings.map((booking) => (
                                                renderBookingRow
                                                    ? renderBookingRow(booking, handleCancelBooking)
                                                    : (
                                                        <tr key={booking.bookingId}>
                                                            <td>{booking.room.hotelName}</td>
                                                            <td>{booking.room.roomType}</td>
                                                            <td>{formatDate(booking.checkInDate)}</td>
                                                            <td>{formatDate(booking.checkOutDate)}</td>
                                                            <td>{booking.numOfAdults}</td>
                                                            <td>{booking.numOfChildren}</td>
                                                            <td>{booking.bookingConfirmationCode}</td>
                                                            <td className={moment.utc().isAfter(moment({year: booking.checkOutDate[0], month: booking.checkOutDate[1] - 1, day: booking.checkOutDate[2]}))
                                                                          ? "text-primary" : "text-success"}>
                                                                          {moment.utc().isAfter(moment({year: booking.checkOutDate[0], month: booking.checkOutDate[1] - 1, day: booking.checkOutDate[2]}))
                                                                          ? "Completed" : "Ongoing"}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    onClick={() => handleCancelBooking(booking.bookingId)}
                                                                    className="uni-button red-button">
                                                                    Cancel
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                            ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No bookings yet.</p>
                                    )}
                                </div>

                                {user?.roles?.includes("ROLE_ADMIN") && (
                                    <div className="card mb-3 shadow p-3">
                                        <h3 className="card-title text-center mt-2 mb-5">Administrator Settings</h3>
                                        {renderSettings && <div className="mt-3">{renderSettings()}</div>}
                                    </div>
                                )}

                                <div className="card mb-5 shadow p-3">
                                    <FindBooking/>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button onClick={handleDeleteAccount}
                                            className="uni-button red-button mt-4">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
            {Footer && <Footer/>}
        </section>
    );
};

export default Profile;