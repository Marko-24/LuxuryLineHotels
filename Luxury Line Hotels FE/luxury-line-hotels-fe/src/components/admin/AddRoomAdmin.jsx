import AddRoom from "../rooms/AddRoom.jsx";
import NavbarLanding from "./NavbarLanding.jsx";
import FooterLanding from "./FooterLanding.jsx";

const AddRoomAdmin = () => {

    const profileLink = "/profile";

    return (
        <>
            <NavbarLanding/>
            <AddRoom profileLink={profileLink} preselectedHotelName={""} isHotelNameDisabled={false}/>
            <FooterLanding/>
        </>
    );
};

export default AddRoomAdmin;