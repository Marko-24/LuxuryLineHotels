import Room from "../../../rooms/Room.jsx";
import RoomCardHolidayInn from "./RoomCardHolidayInn.jsx";
import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";

const RoomHolidayInn = () => {
  const filterCondition = (room) => room.hotelName === "Hotel Holiday Inn";
  const renderRoomCard = (room) => <RoomCardHolidayInn key={room.roomId} room={room}/>;

  return (
    <section>
      <NavbarHolidayInn/>
      <Room filterCondition={filterCondition} renderRoomCard={renderRoomCard}/>;
      <FooterHolidayInn/>
    </section>
  );
};

export default RoomHolidayInn;