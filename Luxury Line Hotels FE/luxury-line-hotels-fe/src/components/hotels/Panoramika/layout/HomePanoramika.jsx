import { Container } from "react-bootstrap";
import HeaderPanoramika from "./HeaderPanoramika.jsx";
import NavbarPanoramika from "./NavbarPanoramika.jsx";
import FooterPanoramika from "./FooterPanoramika.jsx";
import ServicesPanoramika from "./ServicesPanoramika.jsx";
import RoomCarouselPanoramika from "./RoomCarouselPanoramika.jsx";
import RoomSearchPanoramika from "../rooms/RoomSearchPanoramika.jsx";

const HomePanoramika = () => {

    return (
        <section>
            <NavbarPanoramika/>
            <HeaderPanoramika/>
            <section className="container">
                <RoomSearchPanoramika/>
                <ServicesPanoramika/>
                <div className="parallax parallax-panoramika mb-5">
                    <Container className='text-center px-5 py-5 h-100 justify-content-center'>
                        <div className='animated-texts bounceIn'>
                            <h1 style={{marginTop: "100px"}}><span style={{color: "#5e4e2d"}}>Hotel Panoramika</span></h1>
                            <h3>The best services for all your needs</h3>
                        </div>
                    </Container>
                </div>
                <RoomCarouselPanoramika/>
            </section>
            <FooterPanoramika/>
        </section>
    );
};

export default HomePanoramika;