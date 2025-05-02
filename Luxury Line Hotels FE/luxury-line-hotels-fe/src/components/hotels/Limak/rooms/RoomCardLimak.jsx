import RoomCard from "../../../rooms/RoomCard.jsx";

const RoomCardLimak = ({ room }) => {
    return (
        <RoomCard room={room}
                  navigateSuffix="limak"
                  buttonClassName="btn-hotel-limak"
        />
    );
};

export default RoomCardLimak;