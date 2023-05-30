import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import User from "../img/User.png";
import profileDiv from "../img/profileDiv.png";
import { Button } from "antd";

function ProfileDivTemp() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  return (
    <div className="profileDiv">
    
      
      
    
      <div className="BobyUser">
        <div className="buttonUserEx1">
        <Button className="buttonUserEx"  onClick={() => {
        signout(() => navigate("/", { replace: true }));
      }}> Выйти</Button>
      </div>
      <div className="UserIMG">
      <img src={User} ></img>
      </div>
        <Button className="buttonUser"> Избранное</Button>
        <Button className="buttonUser"> Фразеологизм дня</Button>
      </div>
    </div>
  );
}

export default ProfileDivTemp;
