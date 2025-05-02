import HotelCarousel from './HotelCarousel.jsx';
import NavbarLanding from "./NavbarLanding.jsx";
import FooterLanding from "./FooterLanding.jsx";

const LandingPage = () => {
  return (
    <section>
      <NavbarLanding/>
      <div style={{ marginBottom: "-50px", padding: "20px" }}>
        <header className="landing-page-header">
          <div className="overlay"></div>
          <div className="animated-texts overlay-content text-center">
            <h1><span style={{ color: "darkgray" }}>Luxury Line Hotels</span></h1>
            <h4>Hotel Management Panel / Super Admin</h4>
          </div>
        </header>
        <div className="container">
          <h1 style={{ textAlign: "center", color: "rgb(77, 77, 77)" }}>The Hotels</h1>
          <HotelCarousel/>
        </div>
      </div>
      <FooterLanding/>
    </section>
  );
};

export default LandingPage;