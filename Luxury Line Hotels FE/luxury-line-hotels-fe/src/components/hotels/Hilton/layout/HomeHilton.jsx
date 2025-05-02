import { Container } from "react-bootstrap";
import HeaderHilton from "./HeaderHilton.jsx";
import NavbarHilton from "./NavbarHilton.jsx";
import FooterHilton from "./FooterHilton.jsx";
import ServicesHilton from "./ServicesHilton.jsx";
import RoomCarouselHilton from "./RoomCarouselHilton.jsx";
import RoomSearchHilton from "../rooms/RoomSearchHilton.jsx";

const HomeHilton = () => {

    return (
        <section>
            <NavbarHilton/>
            <HeaderHilton/>
            <section className="container">
                <RoomSearchHilton/>
                <ServicesHilton/>
                <div className="parallax parallax-hilton mb-5">
                    <Container className='text-center px-5 py-5 h-100 justify-content-center'>
                        <div className='animated-texts bounceIn'>
                            <h1 style={{marginTop: "100px"}}><span style={{color: "rgba(10,10,100,1)"}}>Hotel Hilton</span></h1>
                            <h3>The best services for all your needs</h3>
                        </div>
                    </Container>
                </div>
                <RoomCarouselHilton/>
            </section>
            <FooterHilton/>
        </section>
    );
};

export default HomeHilton;