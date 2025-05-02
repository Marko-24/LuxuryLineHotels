import Room from "../../../rooms/Room.jsx";
import RoomCardLimak from "./RoomCardLimak.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const RoomLimak = () => {
    const filterCondition = (room) => room.hotelName === "Hotel Limak";
    const renderRoomCard = (room) => <RoomCardLimak key={room.roomId} room={room}/>;

    return (
        <section>
            <NavbarLimak/>
            <Room filterCondition={filterCondition} renderRoomCard={renderRoomCard}/>;
            <FooterLimak/>
        </section>
    );
};

export default RoomLimak;