import React from "react";
import Profile from "../../../auth/Profile.jsx";
import AllRoomsHolidayInn from "../rooms/AllRoomsHolidayInn.jsx";
import BookingsHolidayInn from "../bookings/BookingsHolidayInn.jsx";
import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";

const ProfileHolidayInn = () => {

    const hotelNameFilter = "Hotel Holiday Inn";
    const renderSettings = () => (
        <>
            <AllRoomsHolidayInn/>
            <BookingsHolidayInn/>
        </>
    );

    return (
        <Profile renderSettings={renderSettings}
                 redirectUrl="/hotel-holiday-inn"
                 navbar={NavbarHolidayInn}
                 footer={FooterHolidayInn}
                 hotelNameFilter={hotelNameFilter}
        />
    );
};

export default ProfileHolidayInn;