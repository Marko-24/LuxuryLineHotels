import RoomSearch from "../../../rooms/RoomSearch.jsx";
import RoomCardPanoramika from "./RoomCardPanoramika.jsx";

const RoomSearchPanoramika = () => {
    return (
        <RoomSearch gradientColor="brown-gradient"
                    hotelNameSearch="Hotel Panoramika"
                    buttonClassName="btn-hotel-panoramika"
                    CardComponent={RoomCardPanoramika}/>
    );
};

export default RoomSearchPanoramika;