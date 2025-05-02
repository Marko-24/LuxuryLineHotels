import AddRoom from "../../../rooms/AddRoom.jsx";
import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";

const AddRoomPanoramika = () => {
    const profileLink = "/profile-panoramika";

    return (
        <>
            <NavbarPanoramika/>
            <AddRoom profileLink={profileLink} preselectedHotelName="Hotel Panoramika" isHotelNameDisabled={true}/>
            <FooterPanoramika/>
        </>
    );
};

export default AddRoomPanoramika;