import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
//Импорт картинок

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
            className="imgHeader"
            onClick={() => {
              navigate("/");
            }}
            src={props.logo}
          />
        </div>
        <div className="buttons">{props.buttons}</div>
      </div>
    </div>
  );
}
export default Header;
