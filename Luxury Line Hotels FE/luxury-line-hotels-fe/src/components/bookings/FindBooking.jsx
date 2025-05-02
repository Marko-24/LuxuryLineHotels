import React, { useState } from "react";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import { cancelBooking, getBookingByConfirmationCode } from "../utilities/APIfunctions.js";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingInfo, setBookingInfo] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(null);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => 2000);
  };

  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.bookingId);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully.");
      setTimeout(() => {
        setSuccessMessage("");
        setIsDeleted(false);
        setBookingInfo(null);
        setConfirmationCode("");
        setError(null);
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClearSearch = () => {
    setBookingInfo(null);
    setConfirmationCode("");
    setError(null);
    setSuccessMessage("");
    setIsDeleted(false);
  };

  return (
    <>
      <h3 className="mb-3">Find a specific booking</h3>
      <div className="d-flex">
        <form onSubmit={handleFormSubmit} className="col-md-6" style={{boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", borderRadius: "7px"}}>
          <div className="input-group">
            <input className="form-control"
                   type="text"
                   id="confirmationCode"
                   name="confirmationCode"
                   value={confirmationCode}
                   onChange={handleInputChange}
                   placeholder="Enter confirmation code"
            />
            <button type="submit" className="uni-button green-button" style={{borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}}>
              Search
            </button>
          </div>
        </form>
        <button onClick={handleClearSearch}
                className="uni-button red-button ms-3">
          Clear Search
        </button>
      </div>
      {error && <div className="text-danger">{error}</div>}
      <AnimatePresence>
        {bookingInfo && !isDeleted && (
          <motion.div className="col-md-6 mt-4 mb-5"
                      initial={{opacity: 0, height: 0, overflow: "hidden"}}
                      animate={{opacity: 1, height: "auto", overflow: "visible"}}
                      exit={{opacity: 0, height: 0, overflow: "hidden", transition: {duration: 0.5}}}
          >
            <div className="mt-4" style={{border: "solid #dbb257", borderRadius: "10px", padding: "25px"}}>
              <h3>Booking Information</h3>
              <hr/>
              <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
              <p>Room Number: {bookingInfo.room.roomId}</p>
              <p>Room Type: {bookingInfo.room.roomType}</p>
              <p>Check-in Date: {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</p>
              <p>Check-out Date: {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}</p>
              <p>Full Name: {bookingInfo.guestFullName}</p>
              <p>Email Address: {bookingInfo.guestEmail}</p>
              <p>Adults: {bookingInfo.numOfAdults}</p>
              <p>Children: {bookingInfo.numOfChildren}</p>
              <p style={{marginBottom: "20px"}}>Total Guests: {bookingInfo.numOfTotalGuests}</p>
              <button onClick={handleBookingCancellation} className="uni-button red-button">
                Cancel reservation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
    </>
  );
};

export default FindBooking;