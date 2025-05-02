import RoomCard from "../../../rooms/RoomCard.jsx";

const RoomCardPanoramika = ({ room }) => {
    return (
        <RoomCard room={room}
                  navigateSuffix="panoramika"
                  buttonClassName="btn-hotel-panoramika"
        />
    );
};

export default RoomCardPanoramika;