import React from "react";
import Registration from "../../../auth/Registration.jsx";
import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";

const RegistrationPanoramika = () => {
    return (
        <>
            <Registration title="Register your new Panoramika account"
                          successMessage="Registration successful. Welcome to Panoramika!"
                          errorMessage="An error occurred during registration. Please try again."
                          loginRedirectPath="/login-panoramika"
                          navbar={NavbarPanoramika}
                          footer={FooterPanoramika}
            />
        </>
    );
};

export default RegistrationPanoramika;