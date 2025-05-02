import RoomSearch from "../../../rooms/RoomSearch.jsx";
import RoomCardLimak from "./RoomCardLimak.jsx";

const RoomSearchLimak = () => {
    return (
        <RoomSearch gradientColor="gold-gradient"
                    hotelNameSearch="Hotel Limak"
                    buttonClassName="btn-hotel-limak"
                    CardComponent={RoomCardLimak}/>
    );
};

export default RoomSearchLimak;