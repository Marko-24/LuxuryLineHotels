import Room from "../../../rooms/Room.jsx";
import RoomCardMarriott from "./RoomCardMarriott.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const RoomMarriott = () => {
    const filterCondition = (room) => room.hotelName === "Hotel Marriott";
    const renderRoomCard = (room) => <RoomCardMarriott key={room.roomId} room={room}/>;

    return (
        <section>
            <NavbarMarriott/>
            <Room filterCondition={filterCondition} renderRoomCard={renderRoomCard}/>;
            <FooterMarriott/>
        </section>
    );
};

export default RoomMarriott;