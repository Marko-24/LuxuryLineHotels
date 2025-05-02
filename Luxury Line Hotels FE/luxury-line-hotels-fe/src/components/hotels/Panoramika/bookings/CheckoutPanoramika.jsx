import Checkout from "../../../bookings/Checkout.jsx";
import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";
import BookingFormPanoramika from "./BookingFormPanoramika.jsx";

const CheckoutPanoramika = () => {
    return (
        <section className="bg-light shadow">
            <NavbarPanoramika/>
            <Checkout FormComponent={BookingFormPanoramika}/>
            <FooterPanoramika/>
        </section>
    );
};

export default CheckoutPanoramika;