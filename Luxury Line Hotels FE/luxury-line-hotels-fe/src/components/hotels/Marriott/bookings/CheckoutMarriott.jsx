import Checkout from "../../../bookings/Checkout.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import BookingFormMarriott from "./BookingFormMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const CheckoutMarriott = () => {
    return (
        <section className="bg-light shadow">
            <NavbarMarriott/>
            <Checkout FormComponent={BookingFormMarriott}/>
            <FooterMarriott/>
        </section>
    );
};

export default CheckoutMarriott;