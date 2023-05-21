import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
//Импорт картинок
import logoHeader from "../img/logo_header_logout2.png";

function Header(props) {
  const navigate = useNavigate();
  //Передаваемые кнопки в футер
  const buttons = [
    <p
      onClick={() => {
        navigate("/pages/About");
      }}
    >
      О нас
    </p>,
    <p
      onClick={() => {
        navigate("/pages/Library");
      }}
    >
      Библиотека
    </p>,
    <p
      onClick={() => {
        navigate("/pages/Translater");
      }}
    >
      Переводчик
    </p>,
    <button
      className="buttonWhite"
      onClick={() => {
        navigate("/pages/Authorization");
      }}
    >
      Войти
    </button>,
  ];
  return (
    <div className="header">
      <div className="container">
        <div className="headerChildren">
          <img
            onClick={() => {
              navigate("/");
            }}
            src={logoHeader}
          />
        </div>
        <div className="buttons">{props.buttons}</div>
      </div>
    </div>
  );
}
export default Header;
