import { Link, useLocation } from "react-router-dom";
import HeaderBookings from "./HeaderBookings.jsx";

const BookingSuccess = ({ browseLink }) => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <section>
      <div className="container" style={{ marginBottom: "100px" }}>
        <HeaderBookings title="Booking Completed"/>
        <div className="mt-5">
          {message ? (
            <div>
              <h3 className="text-success">Booking Successful.</h3>
              <p className="text-success">{message}</p>
              <Link to={browseLink} className="btn btn-outline-primary">Back to all rooms</Link>
            </div>
          ) : (
            <div>
              <h3 className="text-primary">
                Processing reservation...
                <span className="spinner-border text-primary spinner-border-sm ms-2" role="status"/>
              </h3>
              <p className="text-secondary mb-4">If this window still appears, try booking other dates for the selected room.</p>
              <Link to={browseLink} className="btn btn-outline-primary">Back to all rooms</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSuccess;