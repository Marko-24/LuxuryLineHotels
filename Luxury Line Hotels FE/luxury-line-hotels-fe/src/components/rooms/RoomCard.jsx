import { Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RoomCard = ({ room, navigateSuffix, buttonClassName }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        navigate(`/book-room/${room.roomId}/${navigateSuffix}`);
    };

    return (
        <Col key={room.roomId} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <Link to={`/book-room/${room.roomId}/${navigateSuffix}`}>
                        <Card.Img variant="top"
                                  src={`data:image/jpeg;base64,${room.photos[0]}`}
                                  alt={"Room Photo"}
                                  style={{width: "100%", maxWidth: "200px", height: "100%",
                                      borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px"}}
                        />
                    </Link>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Link to={`/book-room/${room.roomId}/${navigateSuffix}`} className="text-decoration-none">
                            <Card.Title style={{ color: "rgb(117, 117, 117)" }}>{room.roomType}</Card.Title>
                        </Link>
                        <Card.Title style={{color: "#635b46", fontSize: "medium"}}>{room.roomPrice}€/night</Card.Title>
                        <Card.Text>All amenities are included in this room.</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <button onClick={handleButtonClick} className={`btn ${buttonClassName}`}>Book</button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default RoomCard;