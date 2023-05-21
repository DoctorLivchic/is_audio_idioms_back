import React, { Component } from "react";

//Импорт компонентов
import Header from "../components/header";

function UserAccount() {
  const buttons = [
    <p onClick={() => {}}>О нас</p>,
    <p onClick={() => {}}>Библиотека</p>,
    <p onClick={() => {}}>Переводчик</p>,
    <button className="buttonWhite" onClick={() => {}}>
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
