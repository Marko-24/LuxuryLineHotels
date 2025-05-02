import React from "react";
import NavbarLanding from "../../../admin/NavbarLanding.jsx";
import LogoutHilton from "../account/LogoutHilton.jsx";

const NavbarHilton = () => {
    return (
        <NavbarLanding hotelName="Hotel Hilton"
                       hotelLink="/hotel-hilton"
                       browseLink="/browse-rooms-hilton"
                       loginLink="/login-hilton"
                       logoutComponent={<LogoutHilton/>}
                       gradientClass="blue-gradient"
        />
    );
};

export default NavbarHilton;