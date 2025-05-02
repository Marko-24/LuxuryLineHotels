import EditRoom from "../../../rooms/EditRoom.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const EditRoomMarriott = () => {
    const profileLink = "/profile-marriott";

    return (
        <>
            <NavbarMarriott/>
            <EditRoom profileLink={profileLink}/>
            <FooterMarriott/>
        </>
    );
};

export default EditRoomMarriott;