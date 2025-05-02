import React from "react";
import NavbarLanding from "../../../admin/NavbarLanding.jsx";
import LogoutPanoramika from "../account/LogoutPanoramika.jsx";

const NavbarPanoramika = () => {
    return (
        <NavbarLanding hotelName="Hotel Panoramika"
                       hotelLink="/hotel-panoramika"
                       browseLink="/browse-rooms-panoramika"
                       loginLink="/login-panoramika"
                       logoutComponent={<LogoutPanoramika/>}
                       gradientClass="brown-gradient"
                       hotelNameClassName="panoramika-color"
        />
    );
};

export default NavbarPanoramika;