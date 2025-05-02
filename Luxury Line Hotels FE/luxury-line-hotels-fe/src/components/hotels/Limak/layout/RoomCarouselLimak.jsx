import RoomCarousel from "../../../common/RoomCarousel.jsx";

const RoomCarouselLimak = () => {
    const hotelName = "Hotel Limak";
    const roomClass = "browse-rooms-limak";
    const browseLink = "/browse-rooms-limak";
    const cardButtonClass = "btn btn-hotel-limak";
    const gradient = "gold-gradient";
    const bookRoomLink = (roomId) => `/book-room/${roomId}/limak`;

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

export default RoomCarouselLimak;