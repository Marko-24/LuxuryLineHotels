import BookingForm from "../../../bookings/BookingForm.jsx";
import BookingSummaryMarriott from "./BookingSummaryMarriott.jsx";

const BookingFormMarriott = () => {
    return <BookingForm successUrl="/booking-success-marriott"
                        hotelNameSearch="Hotel Marriott"
                        SummaryComponent={BookingSummaryMarriott}/>;
};

export default BookingFormMarriott;