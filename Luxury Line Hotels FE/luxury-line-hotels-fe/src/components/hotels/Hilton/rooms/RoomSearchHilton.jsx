import RoomSearch from "../../../rooms/RoomSearch.jsx";
import RoomCardHilton from "./RoomCardHilton.jsx";

const RoomSearchHilton = () => {
    return (
        <RoomSearch gradientColor="blue-gradient"
                    hotelNameSearch="Hotel Hilton"
                    buttonClassName="btn-hotel-hilton"
                    CardComponent={RoomCardHilton}/>
    );
};

export default RoomSearchHilton;