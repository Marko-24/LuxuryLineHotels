import React from "react";
import Bookings from "../../../bookings/Bookings.jsx";

const BookingsHilton = () => {
    const filterHiltonBookings = (data) =>
        data.filter(
            (booking) => booking.room && booking.room.hotelName === "Hotel Hilton"
        );

    return (
        <Bookings filterBookings={filterHiltonBookings}/>
    );
};

export default BookingsHilton;