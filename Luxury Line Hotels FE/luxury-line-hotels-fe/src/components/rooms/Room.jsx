import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllRooms } from "../utilities/APIfunctions.js";
import RoomPaginator from "../common/RoomPaginator.jsx";
import RoomTypeFilter from "../common/RoomTypeFilter.jsx";

const Room = ({ filterCondition, renderRoomCard }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                const filteredRooms = data.filter(filterCondition);
                setData(filteredRooms);
                setFilteredData(filteredRooms);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [filterCondition]);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div className="text-danger">Error: {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const totalPages = Math.ceil(filteredData.length / roomsPerPage);

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filteredData.slice(startIndex, endIndex).map(renderRoomCard);
    };

    return (
      <Container className="mt-5" style={{marginBottom: "-25px"}}>
        <Row>
          <Col md={6}>
            <RoomTypeFilter data={data} setFilteredData={setFilteredData}/>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <RoomPaginator currentPage={currentPage}
                           totalPages={totalPages}
                           onPageChange={handlePageChange}
            />
          </Col>
        </Row>
        <Row>
          <div style={{flexDirection: "row"}}>{renderRooms()}</div>
        </Row>
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <RoomPaginator currentPage={currentPage}
                           totalPages={totalPages}
                           onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
    );
};

export default Room;