import React from "react";
import NavbarLanding from "../../../admin/NavbarLanding.jsx";
import LogoutMarriott from "../account/LogoutMarriott.jsx";

const NavbarMarriott = () => {
    return (
        <NavbarLanding hotelName="Hotel Marriott"
                       hotelLink="/hotel-marriott"
                       browseLink="/browse-rooms-marriott"
                       loginLink="/login-marriott"
                       logoutComponent={<LogoutMarriott/>}
                       gradientClass="red-gradient"
                       hotelNameClassName="marriott-color"
        />
    );
};

export default NavbarMarriott;