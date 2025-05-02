import AddRoom from "../../../rooms/AddRoom.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const AddRoomLimak = () => {
    const profileLink = "/profile-limak";

    return (
        <>
            <NavbarLimak/>
            <AddRoom profileLink={profileLink} preselectedHotelName="Hotel Limak" isHotelNameDisabled={true}/>
            <FooterLimak/>
        </>
    );
};

export default AddRoomLimak;