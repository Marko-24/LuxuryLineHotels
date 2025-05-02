import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShirt } from 'react-icons/fa6';
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaUtensils, FaWifi } from 'react-icons/fa';

const ServicesHolidayInn = ({ hotelColor, hotelName }) => {
  return (
    <>
      <Container className='mb-2'>
        <Row>
          <h2 className='text-center mb-3' style={{color: "rgb(85, 85, 85)"}}>
            Services at <span className={hotelColor}>{hotelName}</span>
          </h2>
          <hr/>
          <h4 className='text-center'>
            <span className='gap-2'><FaClock/> 24/7 Reception</span>
          </h4>
        </Row>
        <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className={hotelColor}>
                  <FaParking/> Parking
                </Card.Title>
                <Card.Text>A special place for your car at an on-site parking.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className={hotelColor}>
                  <FaWifi/> Wifi
                </Card.Title>
                <Card.Text>Stay connected with high-speed internet access.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className={hotelColor}>
                  <FaSnowflake/> Air Conditioning
                </Card.Title>
                <Card.Text>Always keep a comfortable temperature.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className={hotelColor}>
                  <FaUtensils/> Breakfast
                </Card.Title>
                <Card.Text>Start your day with a breakfast buffet.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className={hotelColor}>
                  <FaCocktail/> Minibar
                </Card.Title>
                <Card.Text>Enjoy a refreshing beverage/snack at all times.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className={hotelColor}>
                  <FaShirt/> Laundry
                </Card.Title>
                <Card.Text>Have clean clothes on you at all times.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServicesHolidayInn;