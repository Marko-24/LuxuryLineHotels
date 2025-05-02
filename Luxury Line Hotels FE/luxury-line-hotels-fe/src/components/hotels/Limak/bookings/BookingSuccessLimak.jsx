import BookingSuccess from "../../../bookings/BookingSuccess.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const BookingSuccessLimak = () => {
    return (
        <section>
            <NavbarLimak/>
            <BookingSuccess browseLink="/browse-rooms-limak"/>
            <FooterLimak/>
        </section>
    )
}

export default BookingSuccessLimak;