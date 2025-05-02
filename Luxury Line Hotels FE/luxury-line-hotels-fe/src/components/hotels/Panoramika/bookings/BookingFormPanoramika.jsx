import BookingForm from "../../../bookings/BookingForm.jsx";
import BookingSummaryPanoramika from "./BookingSummaryPanoramika.jsx";

const BookingFormPanoramika = () => {
    return <BookingForm successUrl="/booking-success-panoramika"
                        hotelNameSearch="Hotel Panoramika"
                        SummaryComponent={BookingSummaryPanoramika}/>;
};

export default BookingFormPanoramika;