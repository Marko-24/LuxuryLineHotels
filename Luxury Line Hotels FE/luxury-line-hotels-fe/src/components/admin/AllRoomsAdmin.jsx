import AllRooms from "../rooms/AllRooms.jsx";
import { getAllRooms } from "../utilities/APIfunctions.js";

const AllRoomsAdmin = () => {
  const nameLink = "admin";

  const fetchRooms = async () => {
    return await getAllRooms();
  };

  return (
    <>
      <AllRooms nameLink={nameLink} fetchRooms={fetchRooms}/>
    </>
  );
};

export default AllRoomsAdmin;