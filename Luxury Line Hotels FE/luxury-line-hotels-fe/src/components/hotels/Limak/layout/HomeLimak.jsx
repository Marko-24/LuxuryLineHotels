import { Container } from "react-bootstrap";
import NavbarLimak from "./NavbarLimak.jsx";
import HeaderLimak from "./HeaderLimak.jsx";
import RoomSearchLimak from "../rooms/RoomSearchLimak.jsx";
import ServicesLimak from "./ServicesLimak.jsx";
import RoomCarouselLimak from "./RoomCarouselLimak.jsx";
import FooterLimak from "./FooterLimak.jsx";

const HomeLimak = () => {

    return (
        <section>
            <NavbarLimak/>
            <HeaderLimak/>
            <section className="container">
                <RoomSearchLimak/>
                <ServicesLimak/>
                <div className="parallax parallax-limak mb-5">
                    <Container className='text-center px-5 py-5 h-100 justify-content-center'>
                        <div className='animated-texts bounceIn'>
                            <h1 style={{marginTop: "100px"}}><span style={{color: "#ab813a"}}>Hotel Limak</span></h1>
                            <h3>The best services for all your needs</h3>
                        </div>
                    </Container>
                </div>
                <RoomCarouselLimak/>
            </section>
            <FooterLimak/>
        </section>
    );
};

export default HomeLimak;