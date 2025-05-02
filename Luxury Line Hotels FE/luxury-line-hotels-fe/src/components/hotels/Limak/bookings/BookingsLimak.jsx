import React from "react";
import Bookings from "../../../bookings/Bookings.jsx";

const BookingsLimak = () => {
    const filterLimakBookings = (data) =>
        data.filter(
            (booking) => booking.room && booking.room.hotelName === "Hotel Limak"
        );

    return (
        <Bookings filterBookings={filterLimakBookings}/>
    );
};

export default BookingsLimak;