import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Carousel, Row, Col, Card } from "react-bootstrap";
import { getAllRooms } from "../utilities/APIfunctions.js";

const RoomCarousel = ({ hotelName, roomClass, browseLink, cardButtonClass, gradient, bookRoomLink }) => {

    const [rooms, setRooms] = useState([{ roomId: "", roomType: "", roomPrice: "", photos: [] }]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                const filteredRooms = data.filter((room) => room.hotelName === hotelName);
                setRooms(filteredRooms);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, [hotelName]);

    const handleBookClick = (roomId) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(bookRoomLink(roomId));
    };

    if (isLoading) {
        return <div className="mt-5">Loading...</div>;
    }
    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
    }

    return (
      <section className={`mb-5 mt-5 shadow carousel-wrapper ${gradient}`}>
        <div style={{ marginBottom: "19px", marginTop: "15px" }}>
          <Link to={browseLink} className={roomClass}>
            Browse all rooms
          </Link>
        </div>
        <Container>
          <Carousel indicators={false}>
            {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
              <Carousel.Item key={index}>
                <Row>
                  {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                    <Col key={room.roomId} className="mb-4" xs={12} md={6} lg={3}>
                      <Card>
                        <Link to={bookRoomLink(room.roomId)} className="btn btn-sm" style={{marginLeft: "-10px", marginRight: "-10px", marginTop: "-6px"}}>
                          <Card.Img src={`data:image/jpeg;base64,${room.photos[0]}`}
                                    variant="top"
                                    alt="Room Photo"
                                    style={{ height:"150px"}}
                          />
                        </Link>
                        <Card.Body>
                          <Link to={bookRoomLink(room.roomId)} className="text-decoration-none">
                            <Card.Title style={{color: "rgb(117, 117, 117)"}}>
                              {room.roomType}
                            </Card.Title>
                            <hr/>
                          </Link>
                          <Card.Title style={{color: "#635b46", fontSize: "medium"}}>{room.roomPrice}€/night</Card.Title>
                          <Card.Text>All amenities are included in this room.</Card.Text>
                          <div className="flex-shrink-0 mt-3">
                            <button onClick={() => handleBookClick(room.roomId)} className={cardButtonClass}>
                              Book
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>
    );
};

export default RoomCarousel;