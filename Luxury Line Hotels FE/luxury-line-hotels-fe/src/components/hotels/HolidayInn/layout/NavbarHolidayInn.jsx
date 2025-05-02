import React from "react";
import NavbarLanding from "../../../admin/NavbarLanding.jsx";
import LogoutHolidayInn from "../account/LogoutHolidayInn.jsx";

const NavbarHolidayInn = () => {
  return (
    <NavbarLanding hotelName="Hotel Holiday Inn"
                   hotelLink="/hotel-holiday-inn"
                   browseLink="/browse-rooms-holiday-inn"
                   loginLink="/login-holiday-inn"
                   logoutComponent={<LogoutHolidayInn/>}
                   gradientClass="green-gradient"
                   hotelNameClassName="holiday-inn-color"
    />
  );
};

export default NavbarHolidayInn;