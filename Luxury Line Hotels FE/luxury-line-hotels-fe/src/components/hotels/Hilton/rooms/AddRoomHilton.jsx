import AddRoom from "../../../rooms/AddRoom.jsx";
import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";

const AddRoomHilton = () => {
    const profileLink = "/profile-holiday-inn";

    return (
        <>
            <NavbarHilton/>
            <AddRoom profileLink={profileLink} preselectedHotelName="Hotel Hilton" isHotelNameDisabled={true}/>
            <FooterHilton/>
        </>
    );
};

export default AddRoomHilton;