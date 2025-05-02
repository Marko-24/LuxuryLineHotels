import AllRooms from "../../../rooms/AllRooms.jsx";
import { getAllRooms } from '../../../utilities/APIfunctions.js';

const AllRoomsHolidayInn = () => {
  const nameLink = "holiday-inn";

  const fetchRooms = async () => {
    const result = await getAllRooms();
    return result.filter((room) => room.hotelName === "Hotel Holiday Inn");
  };

  return (
    <>
      <AllRooms nameLink={nameLink} fetchRooms={fetchRooms}/>
    </>
  );
};

export default AllRoomsHolidayInn;