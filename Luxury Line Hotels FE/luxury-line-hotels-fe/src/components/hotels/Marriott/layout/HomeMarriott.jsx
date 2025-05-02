import { Container } from "react-bootstrap";
import NavbarMarriott from "./NavbarMarriott.jsx";
import HeaderMarriott from "./HeaderMarriott.jsx";
import RoomSearchMarriott from "../rooms/RoomSearchMarriott.jsx";
import ServicesMarriott from "./ServicesMarriott.jsx";
import RoomCarouselMarriott from "./RoomCarouselMarriott.jsx";
import FooterMarriott from "./FooterMarriott.jsx";

const HomeMarriott = () => {

    return (
        <section>
            <NavbarMarriott/>
            <HeaderMarriott/>
            <section className="container">
                <RoomSearchMarriott/>
                <ServicesMarriott/>
                <div className="parallax parallax-marriott mb-5">
                    <Container className='text-center px-5 py-5 h-100 justify-content-center'>
                        <div className='animated-texts bounceIn'>
                            <h1 style={{marginTop: "100px"}}><span style={{color: "rgba(189,13,13,1)"}}>Hotel Marriott</span></h1>
                            <h3>The best services for all your needs</h3>
                        </div>
                    </Container>
                </div>
                <RoomCarouselMarriott/>
            </section>
            <FooterMarriott/>
        </section>
    );
};

export default HomeMarriott;