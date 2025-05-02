import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";
import BookingSuccess from "../../../bookings/BookingSuccess.jsx";

const BookingSuccessHolidayInn = () => {
    return (
      <section>
        <NavbarHolidayInn/>
        <BookingSuccess browseLink="/browse-rooms-holiday-inn"/>
        <FooterHolidayInn/>
      </section>
    )
}

export default BookingSuccessHolidayInn;