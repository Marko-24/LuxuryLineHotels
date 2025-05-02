import Checkout from "../../../bookings/Checkout.jsx";
import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";
import BookingFormHolidayInn from "./BookingFormHolidayInn.jsx";

const CheckoutHolidayInn = () => {
    return (
      <section className="bg-light shadow">
        <NavbarHolidayInn/>
        <Checkout FormComponent={BookingFormHolidayInn}/>
        <FooterHolidayInn/>
      </section>
    );
};

export default CheckoutHolidayInn;