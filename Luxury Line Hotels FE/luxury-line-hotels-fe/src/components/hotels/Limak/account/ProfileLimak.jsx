import React from "react";
import Profile from "../../../auth/Profile.jsx";
import AllRoomsLimak from "../rooms/AllRoomsLimak.jsx";
import BookingsLimak from "../bookings/BookingsLimak.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const ProfileLimak = () => {

    const hotelNameFilter = "Hotel Limak";
    const renderSettings = () => (
        <>
            <AllRoomsLimak/>
            <BookingsLimak/>
        </>
    );

    return (
        <Profile renderSettings={renderSettings}
                 redirectUrl="/hotel-limak"
                 navbar={NavbarLimak}
                 footer={FooterLimak}
                 hotelNameFilter={hotelNameFilter}
        />
    );
};

export default ProfileLimak;