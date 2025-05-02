import RoomCarousel from "../../../common/RoomCarousel.jsx";

const RoomCarouselHolidayInn = () => {
    const hotelName = "Hotel Holiday Inn";
    const roomClass = "browse-rooms-holiday-inn";
    const browseLink = "/browse-rooms-holiday-inn";
    const cardButtonClass = "btn btn-hotel-holiday-inn";
    const gradient = "green-gradient";
    const bookRoomLink = (roomId) => `/book-room/${roomId}/holiday-inn`;

    return (
      <RoomCarousel hotelName={hotelName}
                    roomClass={roomClass}
                    browseLink={browseLink}
                    cardButtonClass={cardButtonClass}
                    gradient={gradient}
                    bookRoomLink={bookRoomLink}
      />
    );
};

export default RoomCarouselHolidayInn;