import EditRoom from "../rooms/EditRoom.jsx";
import FooterLanding from "./FooterLanding.jsx";
import NavbarLanding from "./NavbarLanding.jsx";

const EditRoomAdmin = () => {

    const profileLink = "/profile";

    return (
        <>
            <NavbarLanding/>
            <EditRoom profileLink={profileLink}/>
            <FooterLanding/>
        </>
    );
};

export default EditRoomAdmin;