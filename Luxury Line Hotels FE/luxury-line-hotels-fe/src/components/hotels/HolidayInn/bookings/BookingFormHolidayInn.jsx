import BookingForm from "../../../bookings/BookingForm.jsx";
import BookingSummaryHolidayInn from "./BookingSummaryHolidayInn.jsx";

const BookingFormHolidayInn = () => {
    return <BookingForm successUrl="/booking-success-holiday-inn"
                        hotelNameSearch="Hotel Holiday Inn"
                        SummaryComponent={BookingSummaryHolidayInn}/>;
};

export default BookingFormHolidayInn;