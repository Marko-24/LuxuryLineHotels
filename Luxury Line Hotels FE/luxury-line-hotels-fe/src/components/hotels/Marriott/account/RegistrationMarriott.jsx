import React from "react";
import Registration from "../../../auth/Registration.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const RegistrationMarriott = () => {
  return (
    <>
      <Registration title="Register your new Marriott account"
                    successMessage="Registration successful. Welcome to Marriott!"
                    errorMessage="An error occurred during registration. Please try again."
                    loginRedirectPath="/login-marriott"
                    navbar={NavbarMarriott}
                    footer={FooterMarriott}
      />
    </>
  );
};

export default RegistrationMarriott;