import EditRoom from "../../../rooms/EditRoom.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const EditRoomLimak = () => {
    const profileLink = "/profile-limak";

    return (
        <>
            <NavbarLimak/>
            <EditRoom profileLink={profileLink}/>
            <FooterLimak/>
        </>
    );
};

export default EditRoomLimak;