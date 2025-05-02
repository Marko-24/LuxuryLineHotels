import React from "react";
import Login from "../../../auth/Login.jsx";
import NavbarHolidayInn from "../layout/NavbarHolidayInn.jsx";
import FooterHolidayInn from "../layout/FooterHolidayInn.jsx";

const LoginHolidayInn = () => {
    return (
      <Login redirectUrl="/hotel-holiday-inn"
             navbar={NavbarHolidayInn}
             footer={FooterHolidayInn}
             registerLink="/register-holiday-inn"
             containerStyle={{ marginTop: "150px", marginBottom: "275px" }}
      />
    );
};

export default LoginHolidayInn;