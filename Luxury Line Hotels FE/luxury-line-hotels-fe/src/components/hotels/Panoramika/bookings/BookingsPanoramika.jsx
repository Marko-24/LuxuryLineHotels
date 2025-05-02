import React from "react";
import Bookings from "../../../bookings/Bookings.jsx";

const BookingsPanoramika = () => {
    const filterPanoramikaBookings = (data) =>
        data.filter(
            (booking) => booking.room && booking.room.hotelName === "Hotel Panoramika"
        );

    return (
        <Bookings filterBookings={filterPanoramikaBookings}/>
    );
};

export default BookingsPanoramika;