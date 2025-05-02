import Room from "../../../rooms/Room.jsx";
import RoomCardHilton from "./RoomCardHilton.jsx";
import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";

const RoomHilton = () => {
    const filterCondition = (room) => room.hotelName === "Hotel Hilton";
    const renderRoomCard = (room) => <RoomCardHilton key={room.roomId} room={room}/>;

    return (
        <section>
            <NavbarHilton/>
            <Room filterCondition={filterCondition} renderRoomCard={renderRoomCard}/>;
            <FooterHilton/>
        </section>
    );
};

export default RoomHilton;