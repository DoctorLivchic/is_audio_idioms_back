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
  const user_surname =localStorage.getItem("userSurname")
  const user_patronamic =localStorage.getItem("userpatronymic")
  const email =localStorage.getItem("useremail")
  const rol =localStorage.getItem("userol")
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
      <div className="doby_user_unfo">
      
      </div>
      <div className="user_info">
      <h3 className="H3" > Данные для входа в систему</h3>
      <div className="lin"></div>
      <h3 className="h3"> Имя пользователя</h3>
      <p className="ptext">{user_name}</p>
      <h3 className="h3"> Фамилия пользователя</h3>
      <p className="ptext">{user_surname}</p>
      <h3 className="h3"> Отчество пользователя</h3>
      <p className="ptext">{user_patronamic}</p>
      <h3 className="h3"> Адрес электронной почты</h3>
      <p className="ptext">{email}</p>
      </div>
      <div className="user_info_more">
        <h3 className="H3">Дополнительная информация</h3>
        <div className="lin"></div>
        <h3 className="h3">Роль </h3>
        <p className="ptext">{rol}</p>

       
      </div>
      </div>
      <div className="button_favorite"> 
        <Button className="buttonUser_favorite"   onClick={() => {
        navigate("/pages/Favorites");
      }}> Избранное</Button>
      </div>
      </div>
    </div>
  );
}

export default ProfileDivTemp;
