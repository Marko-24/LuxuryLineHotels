import React from "react";
import Registration from "../../../auth/Registration.jsx";
import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";

const RegistrationHolidayInn = () => {
  return (
    <>
      <Registration title="Register your new Holiday Inn account"
                    successMessage="Registration successful. Welcome to Holiday Inn!"
                    errorMessage="An error occurred during registration. Please try again."
                    loginRedirectPath="/login-holiday-inn"
                    navbar={NavbarHolidayInn}
                    footer={FooterHolidayInn}
      />
    </>
  );
};

export default RegistrationHolidayInn;