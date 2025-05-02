import RoomSearch from "../../../rooms/RoomSearch.jsx";
import RoomCardMarriott from "./RoomCardMarriott.jsx";

const RoomSearchMarriott = () => {
    return (
        <RoomSearch gradientColor="red-gradient"
                    hotelNameSearch="Hotel Marriott"
                    buttonClassName="btn-hotel-marriott"
                    CardComponent={RoomCardMarriott}/>
    );
};

export default RoomSearchMarriott;