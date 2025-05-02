import RoomCarousel from "../../../common/RoomCarousel.jsx";

const RoomCarouselMarriott = () => {
    const hotelName = "Hotel Marriott";
    const roomClass = "browse-rooms-marriott";
    const browseLink = "/browse-rooms-marriott";
    const cardButtonClass = "btn btn-hotel-marriott";
    const gradient = "red-gradient";
    const bookRoomLink = (roomId) => `/book-room/${roomId}/marriott`;

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

export default RoomCarouselMarriott;