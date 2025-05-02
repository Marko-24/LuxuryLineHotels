import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import { bookRoom, getRoomById } from "../utilities/APIfunctions.js";

const BookingForm = ({ successUrl, SummaryComponent }) => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const currentUser = localStorage.getItem("userId");
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        const paymentPerDay = roomPrice ? roomPrice : 0;
        return diffInDays * paymentPerDay;
    };

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    };

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("The check-out date must come after the check-in date.");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
    };

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmitted(true);
            navigate(successUrl, { state: { message: confirmationCode } });
        } catch (error) {
            setErrorMessage(error.message);
            navigate(successUrl, { state: { error: errorMessage } });
        }
    };

    return (
      <>
        <div className="container" style={{marginBottom: "70px"}}>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-body mt-4">
                <h4 style={{marginBottom: "-5px"}}>Reservation Details</h4><hr/>
                <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label htmlFor="guestFullName">Full Name:</Form.Label>
                    <FormControl required onChange={handleInputChange} style={{marginBottom: "5px"}}
                                 type="text"
                                 id="guestFullName"
                                 name="guestFullName"
                                 value={booking.guestFullName}
                                 placeholder="Full Name"/>
                    <Form.Control.Feedback type="invalid">Enter Full Name</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="guestEmail" style={{marginTop: "7px"}}>Email:</Form.Label>
                    <FormControl required onChange={handleInputChange} style={{marginBottom: "5px"}}
                                 disabled
                                 type="email"
                                 id="guestEmail"
                                 name="guestEmail"
                                 value={booking.guestEmail}
                                 placeholder="Email"/>
                    <Form.Control.Feedback type="invalid">Enter Email</Form.Control.Feedback>
                  </Form.Group>
                  <fieldset style={{border: "2px"}}>
                    <legend style={{marginTop: "10px"}}>Staying Period</legend>
                    <div className="row">
                      <div className="col-6">
                        <Form.Label htmlFor="checkInDate">Check-In Date:</Form.Label>
                        <FormControl required onChange={handleInputChange} style={{marginBottom: "5px"}}
                                     type="date"
                                     id="checkInDate"
                                     name="checkInDate"
                                     value={booking.checkInDate}
                                     placeholder="Select Check-In Date"
                                     min={moment().format("Do MMM, YYYY")}/>
                        <Form.Control.Feedback type="invalid">Select Check-In Date</Form.Control.Feedback>
                      </div>
                      <div className="col-6">
                        <Form.Label htmlFor="checkOutDate">Check-Out Date:</Form.Label>
                        <FormControl required onChange={handleInputChange} style={{marginBottom: "5px"}}
                                     type="date"
                                     id="checkOutDate"
                                     name="checkOutDate"
                                     value={booking.checkOutDate}
                                     placeholder="Select Check-Out Date"
                                     min={moment().format("Do MMM, YYYY")}/>
                        <Form.Control.Feedback type="invalid">Select Check-Out Date</Form.Control.Feedback>
                      </div>
                      {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                    </div>
                  </fieldset>
                  <fieldset style={{border: "2px"}}>
                    <legend style={{marginTop: "10px"}}>Number of guests</legend>
                    <div className="row">
                      <div className="col-6">
                        <Form.Label htmlFor="numOfAdults">Adults:</Form.Label>
                        <FormControl required onChange={handleInputChange} style={{marginBottom: "5px"}}
                                     type="number"
                                     id="numOfAdults"
                                     name="numOfAdults"
                                     value={booking.numOfAdults}
                                     placeholder="Number Of Adults"
                                     min={1}/>
                        <Form.Control.Feedback type="invalid">At least 1 adult required</Form.Control.Feedback>
                      </div>
                      <div className="col-6">
                        <Form.Label htmlFor="numOfChildren">Children:</Form.Label>
                        <FormControl required onChange={handleInputChange} style={{marginBottom: "5px"}}
                                     type="number"
                                     id="numOfChildren"
                                     name="numOfChildren"
                                     value={booking.numOfChildren}
                                     placeholder="Number Of Children"/>
                        <Form.Control.Feedback type="invalid">Enter 0 if no children are present</Form.Control.Feedback>
                      </div>
                    </div>
                  </fieldset>
                  <div className="form-group mt-2 mb-2">
                    <button className="btn btn-outline-primary" type="submit" style={{marginTop: "10px"}}>
                      Continue
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-md-6">
              {isSubmitted && (
                <SummaryComponent booking={booking}
                                  payment={calculatePayment()}
                                  isFormValid={isValidated}
                                  onConfirm={handleBooking}/>
              )}
            </div>
          </div>
        </div>
      </>
    )
}

export default BookingForm;