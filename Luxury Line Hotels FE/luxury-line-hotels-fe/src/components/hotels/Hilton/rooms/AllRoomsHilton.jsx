import AllRooms from "../../../rooms/AllRooms.jsx";
import { getAllRooms } from '../../../utilities/APIfunctions.js';

const AllRoomsHilton = () => {
    const nameLink = "hilton";

    const fetchRooms = async () => {
        const result = await getAllRooms();
        return result.filter((room) => room.hotelName === "Hotel Hilton");
    };

    return (
        <>
            <AllRooms nameLink={nameLink} fetchRooms={fetchRooms}/>
        </>
    );
};

export default AllRoomsHilton;