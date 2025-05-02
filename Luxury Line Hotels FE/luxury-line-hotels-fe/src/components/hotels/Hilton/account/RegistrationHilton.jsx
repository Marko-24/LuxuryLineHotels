import React from "react";
import Registration from "../../../auth/Registration.jsx";
import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";

const RegistrationHilton = () => {
    return (
        <>
            <Registration title="Register your new Hilton account"
                          successMessage="Registration successful. Welcome to Hilton!"
                          errorMessage="An error occurred during registration. Please try again."
                          loginRedirectPath="/login-hilton"
                          navbar={NavbarHilton}
                          footer={FooterHilton}
            />
        </>
    );
};

export default RegistrationHilton;