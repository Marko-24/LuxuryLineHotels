import React from "react";
import Bookings from "../../../bookings/Bookings.jsx";

const BookingsHolidayInn = () => {
    const filterHolidayInnBookings = (data) =>
        data.filter(
            (booking) => booking.room && booking.room.hotelName === "Hotel Holiday Inn"
        );

    return (
      <Bookings filterBookings={filterHolidayInnBookings}/>
    );
};

export default BookingsHolidayInn;