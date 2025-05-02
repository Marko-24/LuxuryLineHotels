import { Link } from "react-router-dom";
import { Container, Carousel, Row, Col, Card } from 'react-bootstrap';

const hotels = [
    {
        id: "hilton",
        name: "Hotel Hilton",
        image: "/src/assets/images/carousel/hilton.jpg",
        link: "/hotel-hilton"
    },
    {
        id: "park",
        name: "Hotel Park & Spa",
        image: "/src/assets/images/carousel/park.png",
        link: "/hotel-park"
    },
    {
        id: "panoramika",
        name: "Hotel Panoramika",
        image: "/src/assets/images/carousel/panoramika.png",
        link: "/hotel-panoramika"
    },
    {
        id: "marriott",
        name: "Hotel Marriott",
        image: "/src/assets/images/carousel/marriott.jpg",
        link: "/hotel-marriott"
    },
    {
        id: "limak",
        name: "Hotel Limak",
        image: "/src/assets/images/carousel/limak.png",
        link: "/hotel-limak"
    },
    {
        id: "holiday-inn",
        name: "Hotel Holiday Inn",
        image: "/src/assets/images/carousel/holiday-inn.png",
        link: "/hotel-holiday-inn"
    },
    {
        id: "tcc-grand-plaza",
        name: "Hotel TCC Grand Plaza",
        image: "/src/assets/images/carousel/tcc-grand-plaza.jpg",
        link: "/hotel-tcc-grand-plaza"
    },
    {
        id: "sileks",
        name: "Hotel Sileks",
        image: "/src/assets/images/carousel/sileks.jpg",
        link: "/hotel-sileks"
    },
];

const HotelCarousel = () => {
  return (
    <section className="mb-5 mt-4 shadow silver-gradient" style={{position: "relative", borderRadius: "7px",
                                                                  paddingTop: "30px", paddingBottom: "20px",
                                                                  paddingLeft: "50px", paddingRight: "50px"}}>
      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(hotels.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {hotels.slice(index * 4, index * 4 + 4).map((hotel) => (
                  <Col key={hotel.id} className="mb-4 mt-3" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={hotel.link} className='btn btn-sm' style={{marginLeft: "-10px", marginRight: "-10px", marginTop: "-10px"}}>
                        <Card.Img variant="top"
                                  src={hotel.image}
                                  alt={`${hotel.name} Image`}
                                  style={{height: "150px", paddingTop: "17px", paddingRight: "17px", paddingLeft: "17px"}}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title style={{color: "rgb(67, 67, 67)"}}>{hotel.name}</Card.Title>
                        <hr/>
                        <Link to={hotel.link} className='btn btn-md' style={{backgroundColor: "darkgray", color: "white"}}>
                          Access
                        </Link>
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

export default HotelCarousel;