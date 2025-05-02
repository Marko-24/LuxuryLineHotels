import {useState} from 'react';
import { Link } from 'react-router-dom';
import {addRoom} from '../utilities/APIfunctions.js';
import RoomTypeSelector from '../common/RoomTypeSelector.jsx';
import HotelNameSelector from "../common/HotelNameSelector.jsx";

const AddRoom = ({ profileLink, preselectedHotelName, isHotelNameDisabled }) => {
  const [newRoom, setNewRoom] = useState({
    photos: [],
    hotelName: preselectedHotelName || "",
    roomType: "",
    roomPrice: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "roomPrice") {
      value = isNaN(value) ? "" : parseInt(value);
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setNewRoom((prevRoom) => ({ ...prevRoom, photos: files }));
  };

  const handleMainPhotoSelect = (index) => {
    setPhotos((prevPhotos) => {
      return [prevPhotos[index], ...prevPhotos.filter((_, i) => i !== index)];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    formData.append("hotelName", newRoom.hotelName);
    formData.append("roomType", newRoom.roomType);
    formData.append("roomPrice", newRoom.roomPrice);
    formData.append("mainPhotoIndex", 0);

    try {
      const success = await addRoom(formData);
      if (success) {
        setSuccessMessage("Upload successful.");
        setNewRoom({ photos: [], hotelName: "", roomType: "", roomPrice: "" });
        setPhotos([]);
        setErrorMessage("");
      } else {
        setErrorMessage("An error occurred during upload.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
      <>
        <section className='container mt-5' style={{marginBottom: "180px"}}>
          <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
              <h2 className='mt-5 mb-2'>Add Room</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='hotelName' className='form-label'>Hotel Name:</label>
                  <div>
                    <HotelNameSelector handleRoomInputChange={handleRoomInputChange}
                                       newRoom={newRoom}
                                       showAddNewHotelName={true}
                                       preselectedHotelName={preselectedHotelName}
                                       isDisabled={isHotelNameDisabled}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='roomType' className='form-label'>Room Type:</label>
                  <div>
                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} showAddNewRoomType={true}/>
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='roomPrice' className='form-label'>Room Price:</label>
                  <input className='form-control'
                         required
                         id='roomPrice'
                         name='roomPrice'
                         type='number'
                         value={newRoom.roomPrice}
                         onChange={handleRoomInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='photo' className='form-label'>Room Photo:</label>
                  <input className='form-control'
                         id='photos'
                         name='photos'
                         type='file'
                         multiple
                         onChange={handleImageChange}
                  />
                  <div style={{display: "flex", gap: "30px", flexWrap: "wrap", marginTop: "30px", marginBottom: "50px"}}>
                    {photos.map((photo, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                          <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index}`}
                              style={{ width: "300px", height: "180px", display: "block", marginBottom: "10px" }}
                          />
                          <button type="button"
                                  className={`btn ${index === 0 ? "btn-success" : "btn-primary"}`}
                                  onClick={() => handleMainPhotoSelect(index)}>
                            {index === 0 ? "Main Photo ✅" : "Set as main"}
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
                <div className='d-grid d-md-flex mt-2 justify-content-center'>
                  <button className="uni-button green-button" style={{marginRight: "20px"}}>Upload Room</button>
                  <Link to={profileLink} className='btn btn-outline-primary'>Back to profile</Link>
                </div>
              </form>
              {successMessage && (
                  <div className='alert alert-success fade show' style={{marginTop: "30px"}}>{successMessage}</div>
              )}
              {errorMessage && (
                  <div className='alert alert-danger fade show' style={{marginTop: "30px"}}>{errorMessage}</div>
              )}
            </div>
          </div>
        </section>
      </>
  );
};

export default AddRoom;