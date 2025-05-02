import RoomCarousel from "../../../common/RoomCarousel.jsx";

const RoomCarouselHilton = () => {
    const hotelName = "Hotel Hilton";
    const roomClass = "browse-rooms-hilton";
    const browseLink = "/browse-rooms-hilton";
    const cardButtonClass = "btn btn-hotel-hilton";
    const gradient = "blue-gradient";
    const bookRoomLink = (roomId) => `/book-room/${roomId}/hilton`;

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

export default RoomCarouselHilton;