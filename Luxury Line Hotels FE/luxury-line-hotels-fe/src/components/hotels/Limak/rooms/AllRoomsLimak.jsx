import AllRooms from "../../../rooms/AllRooms.jsx";
import { getAllRooms } from '../../../utilities/APIfunctions.js';

const AllRoomsLimak = () => {
    const nameLink = "limak";

    const fetchRooms = async () => {
        const result = await getAllRooms();
        return result.filter((room) => room.hotelName === "Hotel Limak");
    };

    return (
        <>
            <AllRooms nameLink={nameLink} fetchRooms={fetchRooms}/>
        </>
    );
};

export default AllRoomsLimak;