import BookingSummary from "../../../bookings/BookingSummary.jsx";

const BookingSummaryHilton = (props) => {
    return <BookingSummary {...props} successUrl="/booking-success-hilton"/>;
};

export default BookingSummaryHilton;