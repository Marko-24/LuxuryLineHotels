import Room from "../../../rooms/Room.jsx";
import RoomCardPanoramika from "./RoomCardPanoramika.jsx";
import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";

const RoomPanoramika = () => {
    const filterCondition = (room) => room.hotelName === "Hotel Panoramika";
    const renderRoomCard = (room) => <RoomCardPanoramika key={room.roomId} room={room}/>;

    return (
        <section>
            <NavbarPanoramika/>
            <Room filterCondition={filterCondition} renderRoomCard={renderRoomCard}/>;
            <FooterPanoramika/>
        </section>
    );
};

export default RoomPanoramika;