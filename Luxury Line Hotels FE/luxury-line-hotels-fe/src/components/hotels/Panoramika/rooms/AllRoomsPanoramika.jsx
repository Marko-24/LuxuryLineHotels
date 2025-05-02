import AllRooms from "../../../rooms/AllRooms.jsx";
import { getAllRooms } from '../../../utilities/APIfunctions.js';

const AllRoomsPanoramika = () => {
    const nameLink = "panoramika";

    const fetchRooms = async () => {
        const result = await getAllRooms();
        return result.filter((room) => room.hotelName === "Hotel Panoramika");
    };

    return (
        <>
            <AllRooms nameLink={nameLink} fetchRooms={fetchRooms}/>
        </>
    );
};

export default AllRoomsPanoramika;