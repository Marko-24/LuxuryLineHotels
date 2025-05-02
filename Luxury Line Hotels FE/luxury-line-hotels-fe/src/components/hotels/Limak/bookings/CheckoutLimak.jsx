import Checkout from "../../../bookings/Checkout.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import BookingFormLimak from "./BookingFormLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const CheckoutLimak = () => {
    return (
        <section className="bg-light shadow">
            <NavbarLimak/>
            <Checkout FormComponent={BookingFormLimak}/>
            <FooterLimak/>
        </section>
    );
};

export default CheckoutLimak;