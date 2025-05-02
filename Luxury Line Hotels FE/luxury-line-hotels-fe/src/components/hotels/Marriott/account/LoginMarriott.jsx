import React from "react";
import Login from "../../../auth/Login.jsx";
import NavbarMarriott from "../layout/NavbarMarriott.jsx";
import FooterMarriott from "../layout/FooterMarriott.jsx";

const LoginMarriott = () => {
    return (
        <Login redirectUrl="/hotel-marriott"
               navbar={NavbarMarriott}
               footer={FooterMarriott}
               registerLink="/register-marriott"
               containerStyle={{ marginTop: "150px", marginBottom: "275px" }}
        />
    );
};

export default LoginMarriott;