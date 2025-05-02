import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utilities/APIfunctions.js";
import { FaUtensils, FaWifi, FaTv, FaWineGlassAlt, FaParking, FaTshirt, FaSnowflake } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Checkout = ({ FormComponent }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [roomInfo, setRoomInfo] = useState({
        photos: [],
        roomType: "",
        roomPrice: "",
    });
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const { roomId } = useParams();

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomId)
                .then((response) => {
                    setRoomInfo(response);
                    setIsLoading(false);
                    setCurrentPhotoIndex(0);
                })
                .catch((error) => {
                    setError(error);
                    setIsLoading(false);
                });
        }, 1000);
    }, [roomId]);

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? roomInfo.photos.length - 1 : prevIndex - 1
        );
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === roomInfo.photos.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div>
            <section className="container mt-5">
                <h2>Reserve room</h2>
                <div className="row">
                    <div className="col-md-4 mt-4 mb-5">
                        {isLoading ? (
                            <p>Loading room information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="room-info">
                                <div className="photo-carousel">
                                    {roomInfo.photos.length > 1 && (
                                        <button className="carousel-btn left" onClick={prevPhoto}>
                                            <FaChevronLeft/>
                                        </button>
                                    )}
                                    <img
                                        src={`data:image/png;base64,${roomInfo.photos[currentPhotoIndex]}`}
                                        alt="Room"
                                        style={{width: "100%", height: "200px"}}
                                    />
                                    {roomInfo.photos.length > 1 && (
                                        <button className="carousel-btn right" onClick={nextPhoto}>
                                            <FaChevronRight/>
                                        </button>
                                    )}
                                </div>

                                <table className="table table-bordered">
                                    <tbody>
                                    <tr>
                                        <th>Room Type:</th>
                                        <td>{roomInfo.roomType}</td>
                                    </tr>
                                    <tr>
                                        <th>Price per night:</th>
                                        <td>€{roomInfo.roomPrice}</td>
                                    </tr>
                                    <tr>
                                        <th>Room Services:</th>
                                        <td>
                                            <ul className="list-unstyled">
                                                <li><FaWifi/> Wifi</li>
                                                <li><FaTv/> Netflix Premium</li>
                                                <li><FaUtensils/> Breakfast</li>
                                                <li><FaWineGlassAlt/> Minibar Refreshments</li>
                                                <li><FaSnowflake/> Air Conditioning</li>
                                                <li><FaTshirt/> Laundry</li>
                                                <li><FaParking/> Parking Space</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <FormComponent/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Checkout;