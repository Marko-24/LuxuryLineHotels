import BookingForm from "../../../bookings/BookingForm.jsx";
import BookingSummaryHilton from "./BookingSummaryHilton.jsx";

const BookingFormHilton = () => {
    return <BookingForm successUrl="/booking-success-hilton"
                        hotelNameSearch="Hotel Hilton"
                        SummaryComponent={BookingSummaryHilton}/>;
};

export default BookingFormHilton;