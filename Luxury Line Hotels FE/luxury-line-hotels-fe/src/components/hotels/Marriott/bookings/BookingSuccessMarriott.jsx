import BookingSuccess from "../../../bookings/BookingSuccess.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const BookingSuccessMarriott = () => {
    return (
        <section>
            <NavbarMarriott/>
            <BookingSuccess browseLink="/browse-rooms-marriott"/>
            <FooterMarriott/>
        </section>
    )
}

export default BookingSuccessMarriott;