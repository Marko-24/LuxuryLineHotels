import { Col, Row, Container } from 'react-bootstrap';

const FooterMarriott = () => {
    let today = new Date();

    return (
        <footer className='text-light py-3 global-footer red-gradient mt-lg-5 sticky-bottom'>
            <Container>
                <Row>
                    <Col xs={12} md={12} className='text-center'>
                        <p>&copy;{today.getFullYear()} Hotel Marriott</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterMarriott;