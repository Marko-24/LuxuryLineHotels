import AddRoom from "../../../rooms/AddRoom.jsx";
import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";

const AddRoomHolidayInn = () => {
  const profileLink = "/profile-holiday-inn";

  return (
    <>
      <NavbarHolidayInn/>
        <AddRoom profileLink={profileLink} preselectedHotelName="Hotel Holiday Inn" isHotelNameDisabled={true}/>
      <FooterHolidayInn/>
    </>
  );
};

export default AddRoomHolidayInn;