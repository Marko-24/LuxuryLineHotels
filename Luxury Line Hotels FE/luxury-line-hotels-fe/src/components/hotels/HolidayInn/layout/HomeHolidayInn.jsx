import { Container } from "react-bootstrap";
import HeaderHolidayInn from "./HeaderHolidayInn.jsx";
import NavbarHolidayInn from "./NavbarHolidayInn.jsx";
import FooterHolidayInn from "./FooterHolidayInn.jsx";
import ServicesHolidayInn from "./ServicesHolidayInn.jsx";
import RoomCarouselHolidayInn from "./RoomCarouselHolidayInn.jsx";
import RoomSearchHolidayInn from "../rooms/RoomSearchHolidayInn.jsx";

const HomeHolidayInn = () => {

  return (
    <section>
      <NavbarHolidayInn/>
      <HeaderHolidayInn/>
      <section className="container">
        <RoomSearchHolidayInn/>
        <ServicesHolidayInn/>
        <div className="parallax parallax-holiday-inn mb-5">
          <Container className='text-center px-5 py-5 h-100 justify-content-center'>
            <div className='animated-texts bounceIn'>
              <h1 style={{marginTop: "100px"}}><span style={{color: "#37e124"}}>Hotel Holiday Inn</span></h1>
              <h3>The best services for all your needs</h3>
            </div>
          </Container>
        </div>
        <RoomCarouselHolidayInn/>
      </section>
      <FooterHolidayInn/>
    </section>
    );
};

export default HomeHolidayInn;