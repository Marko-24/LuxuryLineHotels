import BookingForm from "../../../bookings/BookingForm.jsx";
import BookingSummaryLimak from "./BookingSummaryLimak.jsx";

const BookingFormLimak = () => {
    return <BookingForm successUrl="/booking-success-limak"
                        hotelNameSearch="Hotel Limak"
                        SummaryComponent={BookingSummaryLimak}/>;
};

export default BookingFormLimak;