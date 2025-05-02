import React from "react";
import Login from "../../../auth/Login.jsx";
import NavbarHilton from "../layout/NavbarHilton.jsx";
import FooterHilton from "../layout/FooterHilton.jsx";

const LoginHilton = () => {
    return (
        <Login redirectUrl="/hotel-hilton"
               navbar={NavbarHilton}
               footer={FooterHilton}
               registerLink="/register-hilton"
               containerStyle={{ marginTop: "150px", marginBottom: "275px" }}
        />
    );
};

export default LoginHilton;