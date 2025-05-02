import React from "react";
import Login from "../../../auth/Login.jsx";
import NavbarPanoramika from "../layout/NavbarPanoramika.jsx";
import FooterPanoramika from "../layout/FooterPanoramika.jsx";

const LoginPanoramika = () => {
    return (
        <Login redirectUrl="/hotel-panoramika"
               navbar={NavbarPanoramika}
               footer={FooterPanoramika}
               registerLink="/register-panoramika"
               containerStyle={{ marginTop: "150px", marginBottom: "275px" }}
        />
    );
};

export default LoginPanoramika;