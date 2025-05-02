import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";
import BookingSuccess from "../../../bookings/BookingSuccess.jsx";

const BookingSuccessPanoramika = () => {
    return (
        <section>
            <NavbarPanoramika/>
            <BookingSuccess browseLink="/browse-rooms-panoramika"/>
            <FooterPanoramika/>
        </section>
    )
}

export default BookingSuccessPanoramika;