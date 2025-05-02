import EditRoom from "../../../rooms/EditRoom.jsx";
import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";

const EditRoomPanoramika = () => {

    const profileLink = "/profile-panoramika";

    return (
        <>
            <NavbarPanoramika/>
            <EditRoom profileLink={profileLink}/>
            <FooterPanoramika/>
        </>
    );
};

export default EditRoomPanoramika;