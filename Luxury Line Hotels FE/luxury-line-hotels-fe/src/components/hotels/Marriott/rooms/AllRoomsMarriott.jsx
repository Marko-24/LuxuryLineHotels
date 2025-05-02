import AllRooms from "../../../rooms/AllRooms.jsx";
import { getAllRooms } from '../../../utilities/APIfunctions.js';

const AllRoomsMarriott = () => {
    const nameLink = "marriott";

    const fetchRooms = async () => {
        const result = await getAllRooms();
        return result.filter((room) => room.hotelName === "Hotel Marriott");
    };

    return (
        <>
            <AllRooms nameLink={nameLink} fetchRooms={fetchRooms}/>
        </>
    );
};

export default AllRoomsMarriott;