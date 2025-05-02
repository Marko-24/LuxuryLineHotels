import RoomCard from "../../../rooms/RoomCard.jsx";

const RoomCardHilton = ({ room }) => {
    return (
        <RoomCard room={room}
                  navigateSuffix="hilton"
                  buttonClassName="btn-hotel-hilton"
        />
    );
};

export default RoomCardHilton;