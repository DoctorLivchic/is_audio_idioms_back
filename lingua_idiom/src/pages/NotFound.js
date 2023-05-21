import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { useNavigate } from "react-router-dom";
//Импорт компонентов
import Header from "../components/header";

function NotFound() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
      Вход
    </button>,
  ];
  const buttons2 = [
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
        navigate("/pages/UserAccount");
      }}
    >
      Профиль
    </button>,
  ];
  if (user) {
    return (
      <div className="">
        <Header buttons={buttons2} />
        <div className="whiteBox">
          <div className="textNF">
            К сожалению, мы не нашли страницу, которую вы искали... Вы всегда
            можете вернуться на нашу главную{" "}
            <Link to="/">главную страницу.</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <Header buttons={buttons} />
        <div className="whiteBox">
          <div className="textNF">
            К сожалению, мы не нашли страницу, которую вы искали... Вы всегда
            можете вернуться на нашу главную{" "}
            <Link to="/">главную страницу.</Link>
          </div>
        </div>
      </div>
    );
  }
}
//Передаваемые кнопки в футер

export default NotFound;
