import React from "react";
import Profile from "../../../auth/Profile.jsx";
import AllRoomsPanoramika from "../rooms/AllRoomsPanoramika.jsx";
import BookingsPanoramika from "../bookings/BookingsPanoramika.jsx";
import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";

const ProfilePanoramika = () => {

    const hotelNameFilter = "Hotel Panoramika";
    const renderSettings = () => (
        <>
            <AllRoomsPanoramika/>
            <BookingsPanoramika/>
        </>
    );

    return (
        <Profile renderSettings={renderSettings}
                 redirectUrl="/hotel-panoramika"
                 navbar={NavbarPanoramika}
                 footer={FooterPanoramika}
                 hotelNameFilter={hotelNameFilter}
        />
    );
};

export default ProfilePanoramika;