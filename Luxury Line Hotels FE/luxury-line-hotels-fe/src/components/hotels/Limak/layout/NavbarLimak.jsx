import React from "react";
import NavbarLanding from "../../../admin/NavbarLanding.jsx";
import LogoutLimak from "../account/LogoutLimak.jsx";

const NavbarLimak = () => {
    return (
        <NavbarLanding hotelName="Hotel Limak"
                       hotelLink="/hotel-limak"
                       browseLink="/browse-rooms-limak"
                       loginLink="/login-limak"
                       logoutComponent={<LogoutLimak/>}
                       gradientClass="gold-gradient"
                       hotelNameClassName="limak-color"
        />
    );
};

export default NavbarLimak;