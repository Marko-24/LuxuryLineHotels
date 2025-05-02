import React from "react";
import Profile from "../../../auth/Profile.jsx";
import AllRoomsHilton from "../rooms/AllRoomsHilton.jsx";
import BookingsHilton from "../bookings/BookingsHilton.jsx";
import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";

const ProfileHilton = () => {

    const hotelNameFilter = "Hotel Hilton";
    const renderSettings = () => (
        <>
            <AllRoomsHilton/>
            <BookingsHilton/>
        </>
    );

    return (
        <Profile renderSettings={renderSettings}
                 redirectUrl="/hotel-hilton"
                 navbar={NavbarHilton}
                 footer={FooterHilton}
                 hotelNameFilter={hotelNameFilter}
        />
    );
};

export default ProfileHilton;