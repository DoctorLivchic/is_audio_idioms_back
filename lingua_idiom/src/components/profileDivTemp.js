import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import User from "../img/User.png";
import profileDiv from "../img/profileDiv.png";
import { Button } from "antd";

function ProfileDivTemp() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const user_name =localStorage.getItem("userName")
  return (
    <div className="profileDiv">
    
      <div className="BobyUser">
        <div className="buttonUserEx1">
        <Button className="buttonUserEx"  onClick={() => {
        signout(() => navigate("/", { replace: true }));
      }}> Выйти</Button>
      <div className="doby_user_unfo">
      
      </div>
      </div>
      <div className="UserIMG">
      <img src={User} ></img>
      <h1> user_name</h1>
      </div>
      <div className="button_favorite"> 
        <Button className="buttonUser"   onClick={() => {
        navigate("/pages/Favorites");
      }}> Избранное</Button>
      </div>
      </div>
    </div>
  );
}

export default ProfileDivTemp;
