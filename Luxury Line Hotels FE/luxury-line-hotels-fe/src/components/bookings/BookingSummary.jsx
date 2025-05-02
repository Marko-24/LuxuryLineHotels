import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm, successUrl }) => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numberOfDays = checkOutDate.diff(checkInDate, "days");
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000);
    };

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate(successUrl);
        }
    }, [isBookingConfirmed, navigate, successUrl]);

  return (
    <div className="card card-body mt-4">
      <h4>Reservation Summary</h4><hr/>
      <p>Full Name: <strong>{booking.guestFullName}</strong></p>
      <p>Email: <strong>{booking.guestEmail}</strong></p>
      <p>Check-In Date: <strong>{moment(booking.checkInDate).format("Do MMM YYYY")}</strong></p>
      <p>Check-Out Date: <strong>{moment(booking.checkOutDate).format("Do MMM YYYY")}</strong></p>
      <p>Number of nights: <strong>{numberOfDays}</strong></p>
      <div>
        <h5>Number of guests</h5>
        Adult{booking.numOfAdults > 1 ? "s" : ""}: <strong>{booking.numOfAdults}</strong>
        <p>Children: <strong>{booking.numOfChildren}</strong></p>
      </div>
      {payment > 0 ? (
        <>
          <p>Total payment: <strong>€{payment}</strong></p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Booking confirmed, redirecting...
                </>
              ) : ("Confirm booking and proceed")}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger">Check-Out date must come after Check-In date.</p>
      )}
    </div>
  );
};

export default BookingSummary;