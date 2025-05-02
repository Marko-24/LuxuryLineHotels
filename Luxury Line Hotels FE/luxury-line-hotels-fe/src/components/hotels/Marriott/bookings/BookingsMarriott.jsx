import React from "react";
import Bookings from "../../../bookings/Bookings.jsx";

const BookingsMarriott = () => {
    const filterMarriottBookings = (data) =>
        data.filter(
            (booking) => booking.room && booking.room.hotelName === "Hotel Marriott"
        );

    return (
        <Bookings filterBookings={filterMarriottBookings}/>
    );
};

export default BookingsMarriott;