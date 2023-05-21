import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
//Импорт компонентов
import Header from "../components/header";

function Library() {
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
      Войти
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
      </div>
    );
  } else {
    return (
      <div className="">
        <Header buttons={buttons} />
      </div>
    );
  }
}
//Передаваемые кнопки в футер

export default Library;
