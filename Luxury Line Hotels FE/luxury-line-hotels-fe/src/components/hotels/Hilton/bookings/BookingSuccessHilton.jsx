import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";
import BookingSuccess from "../../../bookings/BookingSuccess.jsx";

const BookingSuccessHilton = () => {
    return (
        <section>
            <NavbarHilton/>
            <BookingSuccess browseLink="/browse-rooms-hilton"/>
            <FooterHilton/>
        </section>
    )
}

export default BookingSuccessHilton;