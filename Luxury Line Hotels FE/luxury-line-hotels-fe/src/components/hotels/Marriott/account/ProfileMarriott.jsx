import React from "react";
import Profile from "../../../auth/Profile.jsx";
import AllRoomsMarriott from "../rooms/AllRoomsMarriott.jsx";
import BookingsMarriott from "../bookings/BookingsMarriott.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const ProfileMarriott = () => {

    const hotelNameFilter = "Hotel Marriott";
    const renderSettings = () => (
        <>
            <AllRoomsMarriott/>
            <BookingsMarriott/>
        </>
    );

    return (
        <Profile renderSettings={renderSettings}
                 redirectUrl="/hotel-marriott"
                 navbar={NavbarMarriott}
                 footer={FooterMarriott}
                 hotelNameFilter={hotelNameFilter}
        />
    );
};

export default ProfileMarriott;