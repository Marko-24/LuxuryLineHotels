import EditRoom from "../../../rooms/EditRoom.jsx";
import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";

const EditRoomHilton = () => {
    const profileLink = "/profile-hilton";

    return (
        <>
            <NavbarHilton/>
            <EditRoom profileLink={profileLink}/>
            <FooterHilton/>
        </>
    );
};

export default EditRoomHilton;