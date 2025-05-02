import React from "react";
import Profile from "../auth/Profile.jsx";
import AllRoomsAdmin from "./AllRoomsAdmin.jsx";
import Bookings from "../bookings/Bookings.jsx";
import NavbarLanding from "./NavbarLanding.jsx";
import FooterLanding from "./FooterLanding.jsx";

const SuperAdminProfile = () => {
  const renderSettings = () => (
    <>
      <AllRoomsAdmin/>
      <Bookings/>
    </>
  );

  return (
      <Profile renderSettings={renderSettings}
               fetchAllBookings={true}
               navbar={NavbarLanding}
               footer={FooterLanding}
      />
  );
};

export default SuperAdminProfile;