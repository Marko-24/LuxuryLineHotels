import RoomCard from "../../../rooms/RoomCard.jsx";

const RoomCardHolidayInn = ({ room }) => {
  return (
    <RoomCard room={room}
              navigateSuffix="holiday-inn"
              buttonClassName="btn-hotel-holiday-inn"
    />
  );
};

export default RoomCardHolidayInn;