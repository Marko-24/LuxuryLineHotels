import React from "react";
import Registration from "../../../auth/Registration.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const RegistrationLimak = () => {
    return (
        <>
            <Registration title="Register your new Limak account"
                          successMessage="Registration successful. Welcome to Limak!"
                          errorMessage="An error occurred during registration. Please try again."
                          loginRedirectPath="/login-limak"
                          navbar={NavbarLimak}
                          footer={FooterLimak}
            />
        </>
    );
};

export default RegistrationLimak;