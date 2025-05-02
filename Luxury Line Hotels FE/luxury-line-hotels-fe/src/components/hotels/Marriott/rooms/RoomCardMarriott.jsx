import RoomCard from "../../../rooms/RoomCard.jsx";

const RoomCardMarriott = ({ room }) => {
    return (
        <RoomCard room={room}
                  navigateSuffix="marriott"
                  buttonClassName="btn-hotel-marriott"
        />
    );
};

export default RoomCardMarriott;