import React from "react";
import Login from "../../../auth/Login.jsx";
import NavbarLimak from "../layout/NavbarLimak.jsx";
import FooterLimak from "../layout/FooterLimak.jsx";

const LoginLimak = () => {
    return (
        <Login redirectUrl="/hotel-limak"
               navbar={NavbarLimak}
               footer={FooterLimak}
               registerLink="/register-limak"
               containerStyle={{ marginTop: "150px", marginBottom: "275px" }}
        />
    );
};

export default LoginLimak;