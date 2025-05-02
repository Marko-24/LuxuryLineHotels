import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import DateSlider from "../common/DateSlider.jsx";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {

    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)
    const filterBookings = (startDate, endDate) => {
        if (!startDate || !endDate) {
            setFilteredBookings(bookingInfo);
            return;
        }
        const filtered = bookingInfo.filter((booking) => {
            if (!booking.checkInDate || !booking.checkOutDate) return false;

            try {
                const bookingStartDate = new Date(booking.checkInDate);
                const bookingEndDate = new Date(booking.checkOutDate);
                return bookingStartDate <= endDate && bookingEndDate >= startDate;
            } catch (error) {
                console.error('Error parsing dates:', error);
                return false;
            }
        });
        setFilteredBookings(filtered);
    };

    const formatDate = (date) => {
        try {
            return format(new Date(date), "d/M/yyyy");
        } catch (error) {
            console.error("Date formatting error:", error);
            return date;
        }
    };

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

    return (
      <div>
        <section className="px-1">
          <div className='d-flex justify-content-between mb-2 mt-4'>
            <h4>Manage Bookings</h4>
          </div>
          <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
          <table className="table table-bordered table-hover text-center shadow">
            <thead>
            <tr>
                <th>Hotel</th>
                <th>Room Type</th>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Guest Name</th>
                <th>Guest Email</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Confirmation Code</th>
                <th colSpan={2}></th>
            </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.room.hotelName}</td>
                  <td>{booking.room.roomType}</td>
                  <td>{formatDate(booking.checkInDate)}</td>
                  <td>{formatDate(booking.checkOutDate)}</td>
                  <td>{booking.guestFullName}</td>
                  <td>{booking.guestEmail}</td>
                  <td>{booking.numOfAdults}</td>
                  <td>{booking.numOfChildren}</td>
                  <td>{booking.bookingConfirmationCode}</td>
                  <td>
                    <button onClick={() => handleBookingCancellation(booking.bookingId)}
                            className="uni-button red-button">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filterBookings.length === 0 && <p>No booking found for the selected dates</p>}
        </section>
      </div>
    );
};

export default BookingsTable;