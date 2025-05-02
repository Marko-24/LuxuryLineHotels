import React, { useState, useEffect } from "react";
import BookingsTable from "./BookingsTable.jsx";
import { cancelBooking, getAllBookings } from "../utilities/APIfunctions.js";

const Bookings = ({ filterBookings }) => {
    const [bookingInfo, setBookingInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getAllBookings();
                const filteredData = filterBookings ? filterBookings(data) : data;
                setBookingInfo(filteredData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, [filterBookings]);

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            setBookingInfo((prevBookings) => prevBookings.filter((booking) => booking.bookingId !== bookingId));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
      <section>
        {error && <div className="text-danger">{error}</div>}
        {isLoading ? (
          <div>Loading all bookings</div>
        ) : (
          <BookingsTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
        )}
      </section>
    );
};

export default Bookings;