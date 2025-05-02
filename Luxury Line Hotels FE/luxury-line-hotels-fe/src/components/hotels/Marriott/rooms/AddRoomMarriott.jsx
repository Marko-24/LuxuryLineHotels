import AddRoom from "../../../rooms/AddRoom.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const AddRoomMarriott = () => {
    const profileLink = "/profile-marriott";

    return (
        <>
            <NavbarMarriott/>
            <AddRoom profileLink={profileLink} preselectedHotelName="Hotel Marriott" isHotelNameDisabled={true}/>
            <FooterMarriott/>
        </>
    );
};

export default AddRoomMarriott;