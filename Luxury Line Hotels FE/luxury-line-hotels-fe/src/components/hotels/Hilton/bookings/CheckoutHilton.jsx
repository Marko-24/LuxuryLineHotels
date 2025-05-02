import Checkout from "../../../bookings/Checkout.jsx";
import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";
import BookingFormHilton from "./BookingFormHilton.jsx";

const CheckoutHilton = () => {
    return (
        <section className="bg-light shadow">
            <NavbarHilton/>
            <Checkout FormComponent={BookingFormHilton}/>
            <FooterHilton/>
        </section>
    );
};

export default CheckoutHilton;