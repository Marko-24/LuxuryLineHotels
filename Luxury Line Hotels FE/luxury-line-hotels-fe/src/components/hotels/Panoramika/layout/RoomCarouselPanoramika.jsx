import RoomCarousel from "../../../common/RoomCarousel.jsx";

const RoomCarouselPanoramika = () => {
    const hotelName = "Hotel Panoramika";
    const roomClass = "browse-rooms-panoramika";
    const browseLink = "/browse-rooms-panoramika";
    const cardButtonClass = "btn btn-hotel-panoramika";
    const gradient = "brown-gradient";
    const bookRoomLink = (roomId) => `/book-room/${roomId}/panoramika`;

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

export default RoomCarouselPanoramika;