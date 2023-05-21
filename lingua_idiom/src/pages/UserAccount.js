import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useNavigate } from "react-router-dom";
//Импорт компонентов
import Header from "../components/header";

function UserAccount() {
  const { signout, user } = useAuth();

  const navigate = useNavigate();
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
        signout(() => navigate("/", { replace: true }));
      }}
    >
      Выход
    </button>,
  ];
  return (
    <div className="">
      <Header buttons={buttons} />
    </div>
  );
}
//Передаваемые кнопки в футер

export default UserAccount;
