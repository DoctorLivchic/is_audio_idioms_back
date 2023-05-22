import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

import profileDiv from "../img/profileDiv.png";

function ProfileDivTemp() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  return (
    <div
      onClick={() => {
        signout(() => navigate("/", { replace: true }));
      }}
      className="profileDiv"
    >
      <div
        className="imgPG"
        style={{
          backgroundImage: `url(${profileDiv})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}

export default ProfileDivTemp;
