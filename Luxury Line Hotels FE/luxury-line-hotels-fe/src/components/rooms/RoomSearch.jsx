import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import moment from "moment";
import RoomPaginator from "../common/RoomPaginator.jsx";
import RoomTypeSelector from "../common/RoomTypeSelector.jsx";
import { getAvailableRooms } from "../utilities/APIfunctions.js";

const RoomSearch = ({ gradientColor, hotelNameSearch, buttonClassName, CardComponent }) => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: "",
        hotelName: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setWarningMessage("");
        setHasSearched(true);

        const checkInMoment = moment(searchQuery.checkInDate);
        const checkOutMoment = moment(searchQuery.checkOutDate);
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please enter valid dates");
            return;
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Check-out date must be after check-in date");
            return;
        }

        setIsLoading(true);
        try {
            const response = await getAvailableRooms(
                searchQuery.checkInDate,
                searchQuery.checkOutDate,
                searchQuery.roomType,
                searchQuery.hotelName
            );
            if (Array.isArray(response.data)) {
                setAvailableRooms(response.data);
            } else {
                console.warn("API response is not an array:", response.data);
                setAvailableRooms([]);
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setErrorMessage("An error occurred while the fetching rooms. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery({ ...searchQuery, [name]: value });
        const checkInDate = moment(searchQuery.checkInDate);
        const checkOutDate = moment(searchQuery.checkOutDate);
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("");
        }
    };

    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: "",
            hotelName: ""
        });
        setAvailableRooms([]);
        setWarningMessage("");
        setHasSearched(false);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredResults = Array.isArray(availableRooms)
        ? availableRooms.filter((room) => room.hotelName === `${hotelNameSearch}`) : [];
    const resultsPerPage = 3;
    const totalResults = filteredResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    return (
      <>
        <Container className={`${gradientColor} shadow mt-5 mb-5`} style={{paddingTop: "50px", paddingBottom: "10px", borderRadius: "7px"}}>
          <Form onSubmit={handleSearch}>
            <Row className="justify-content-center">
              <Col xs={12} md={3}>
                <Form.Group controlId="checkInDate">
                  <Form.Label className="text-white">Check-in Date</Form.Label>
                  <Form.Control type="date"
                                  name="checkInDate"
                                  value={searchQuery.checkInDate}
                                  onChange={handleInputChange}
                                  min={moment().format("YYYY-MM-DD")}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="checkOutDate">
                  <Form.Label className="text-white">Check-out Date</Form.Label>
                  <Form.Control type="date"
                                name="checkOutDate"
                                value={searchQuery.checkOutDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="roomType">
                  <Form.Label className="text-white">Room Type</Form.Label>
                  <div className="d-flex">
                    <RoomTypeSelector handleRoomInputChange={handleInputChange}
                                      newRoom={searchQuery}
                                      showAddNewRoomType={false}
                    />
                    <Button type="submit" className={`${buttonClassName} ms-3`}>
                      Search
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          {warningMessage && (
            <Alert variant="warning" className="mt-4">
              {warningMessage}
            </Alert>
          )}
          {isLoading ? (
            <p className="mt-4">Finding available rooms...</p>
          ) : hasSearched && filteredResults.length === 0 ? (
            <p className="mt-4" style={{color: "whitesmoke", textAlign: "center", paddingBottom: "10px"}}>
              No rooms available for the selected dates.
            </p>
          ) : (
            <>
              <Row className="px-lg-5 mb-4 mt-5">
                {paginatedResults.map((room) => (
                  <CardComponent key={room.id}
                                 room={room}
                  />
                ))}
              </Row>
              {totalResults > resultsPerPage && (
                <Row className="px-lg-5">
                  <RoomPaginator currentPage={currentPage}
                                 totalPages={totalPages}
                                 onPageChange={handlePageChange}
                  />
                </Row>
              )}
              {hasSearched && filteredResults.length > 0 && (
                <Row className="px-lg-5" style={{paddingBottom: "40px"}}>
                  <Button onClick={handleClearSearch} className="uni-button red-button">
                    Clear Search
                  </Button>
                </Row>
              )}
            </>
          )}
          {errorMessage && (
            <p className="mt-4" style={{color: "whitesmoke", textAlign: "center"}}>
              {errorMessage}
            </p>
          )}
        </Container>
      </>
    );
};

export default RoomSearch;