import EditRoom from "../../../rooms/EditRoom.jsx";
import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";

const EditRoomHolidayInn = () => {

  const profileLink = "/profile-holiday-inn";

  return (
    <>
      <NavbarHolidayInn/>
      <EditRoom profileLink={profileLink}/>
      <FooterHolidayInn/>
    </>
  );
};

export default EditRoomHolidayInn;