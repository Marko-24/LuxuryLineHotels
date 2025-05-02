import {useEffect, useRef, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { updateRoom, getRoomById } from "../utilities/APIfunctions.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const EditRoom = ({ profileLink }) => {
  const [room, setRoom] = useState({
    photos: [],
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const updateTriggered = useRef(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        if (roomData) {
          setRoom(roomData);
          setPhotos(roomData.photos || []);
          setCurrentPhotoIndex(0);
        }
      } catch (error) {
        setErrorMessage("Error fetching room details.");
      }
    };
    fetchRoom();
  }, [roomId]);

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMainPhotoSelect = (index) => {
    setPhotos((prevPhotos) => {
      return [prevPhotos[index], ...prevPhotos.filter((_, i) => i !== index)];
    });
    setCurrentPhotoIndex(0);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setPhotos(selectedImages);
    setRoom((prevRoom) => ({ ...prevRoom, photos: selectedImages }));
    setCurrentPhotoIndex(0);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "roomPrice") {
      const numericValue = value.trim() === "" ? "" : parseFloat(value);
      if (!isNaN(numericValue) || value === "") {
        setRoom((prevRoom) => ({ ...prevRoom, [name]: numericValue }));
      }
    } else {
      setRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter && e.nativeEvent.submitter.name !== "saveButton") {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("roomType", room.roomType);
      formData.append("roomPrice", room.roomPrice ? room.roomPrice.toString() : "");

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const response = await updateRoom(roomId, formData);
      if (response.status === 200) {
        setShowAlert(true);
        setSuccessMessage("Update successful.");
        setErrorMessage("");

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        setErrorMessage("Couldn't update room.");
        setShowAlert(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowAlert(false);
    }
  };

  return (
      <div className="container mt-5" style={{ marginBottom: "130px" }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Edit Room</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">Room Type</label>
                <input type="text" className="form-control" id="roomType" name="roomType" value={room.roomType} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                <input type="number" className="form-control" id="roomPrice" name="roomPrice" value={room.roomPrice} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="photos" className="form-label">Photos</label>
                <input type="file" className="form-control" id="photos" name="photos" multiple onChange={handleImageChange} />
                {photos.length > 0 && (
                    <div className="photo-carousel" style={{ position: "relative", marginTop: "20px" }}>
                      {photos.length > 1 && (
                          <button className="carousel-btn left" onClick={prevPhoto} style={{ position: "absolute", left: "0px", paddingTop: "120px", paddingBottom: "100px", transform: "translateY(-50%)" }}>
                            <FaChevronLeft />
                          </button>
                      )}

                      <img
                          src={photos[currentPhotoIndex] instanceof File ? URL.createObjectURL(photos[currentPhotoIndex]) : `data:image/png;base64,${photos[currentPhotoIndex]}`}
                          alt={`Preview ${currentPhotoIndex}`}
                          style={{ width: "100%", height: "250px", display: "block", objectFit: "cover", borderRadius: "10px" }}
                      />

                      {photos.length > 1 && (
                          <button className="carousel-btn right" onClick={nextPhoto} style={{ position: "absolute", right: "0px", paddingTop: "120px", paddingBottom: "100px", transform: "translateY(-50%)" }}>
                            <FaChevronRight />
                          </button>
                      )}
                    </div>
                )}
              </div>
              {photos.length > 1 && (
                  <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "20px" }}>
                    {photos.map((photo, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                          <img
                              src={photo instanceof File ? URL.createObjectURL(photo) : `data:image/png;base64,${photo}`}
                              alt={`Preview ${index}`}
                              style={{ width: "100px", height: "60px", objectFit: "cover", display: "block", borderRadius: "5px", cursor: "pointer" }}
                              onClick={() => handleMainPhotoSelect(index)}
                          />
                          <button
                              type="button"
                              className={`btn ${index === 0 ? "btn-success" : "btn-primary"} btn-sm mt-1`}
                              onClick={() => handleMainPhotoSelect(index)}
                          >
                            {index === 0 ? "Main Photo ✅" : "Set as main"}
                          </button>
                        </div>
                    ))}
                  </div>
              )}
              <div className="d-grid gap-3 d-md-flex mt-4">
                <button type="submit" name="saveButton" className="btn btn-outline-success">Save changes</button>
                <Link to={profileLink} className="btn btn-outline-primary">Back to profile</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default EditRoom;