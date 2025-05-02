import RoomSearch from "../../../rooms/RoomSearch.jsx";
import RoomCardHolidayInn from "./RoomCardHolidayInn.jsx";

const RoomSearchHolidayInn = () => {
  return (
    <RoomSearch gradientColor="green-gradient"
                hotelNameSearch="Hotel Holiday Inn"
                buttonClassName="btn-hotel-holiday-inn"
                CardComponent={RoomCardHolidayInn}/>
  );
};

export default RoomSearchHolidayInn;