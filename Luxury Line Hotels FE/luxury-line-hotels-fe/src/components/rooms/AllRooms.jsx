import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RoomFilter from '../common/RoomFilter.jsx';
import RoomPaginator from '../common/RoomPaginator.jsx';
import { deleteRoom } from '../utilities/APIfunctions.js';

const AllRooms = ({ nameLink, fetchRooms }) => {

    const[rooms, setRooms] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage] = useState(5)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([])
    const[selectedRoomType] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const loadRooms = async () => {
            setIsLoading(true);
            try {
                const result = await fetchRooms();
                setRooms(result);
                setIsLoading(false);
            } catch (error) {
                setErrorMessage(error.message);
                setIsLoading(false);
            }
        };
        loadRooms();
    }, [fetchRooms]);

    useEffect(() => {
        if(selectedRoomType === "") {
            setFilteredRooms(rooms)
        }
        else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)

    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async(roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if(result === "") {
                setErrorMessage(`Room #${roomId} has been deleted.`)
                fetchRooms()
            }
            else {
                console.error(`Couldn't delete room #${result.message}`)
            }
        } catch(error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
          setSuccessMessage("")
          setErrorMessage("")
        }, 4000)
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

  return (
    <>
      <div className='container col-md-8 col-lg-6'>
        {successMessage && <p className='alert alert-success mt-5'>{successMessage}</p>}
        {errorMessage && <p className='alert alert-danger mt-5'>{errorMessage}</p>}
      </div>
      {isLoading ? (
        <p>Loading rooms...</p>
      ) : (
        <>
          <section className='container'>
            <div className='d-flex justify-content-between mb-3' style={{marginTop: "-25px"}}>
              <h4>Manage Rooms</h4>
            </div>
            <Row className="align-items-center">
              <Col md={6} className="d-flex">
                <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={`/add-room/${nameLink}`}>
                  <button className="uni-button green-button" style={{marginBottom: "16px"}}>Insert New Room</button>
                </Link>
              </Col>
            </Row>
            <table className='table table-bordered table-hover' style={{marginBottom: "40px"}}>
              <thead>
                <tr className='text-center'>
                  <th>Id</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Hotel</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.roomId} className='text-center'>
                    <td>{room.roomId}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}€/night</td>
                    <td>{room.hotelName}</td>
                    <td className='gap-2'>
                      <Link to={`/edit-room/${room.roomId}/${nameLink}`}>
                        <button className="uni-button update-room">
                          Update
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(room.roomId)}
                              className="uni-button red-button ms-3">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              <RoomPaginator currentPage={currentPage}
                             totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                             onPageChange={handlePaginationClick}
              />
          </section>
        </>
      )}
    </>
  );
};

export default AllRooms;