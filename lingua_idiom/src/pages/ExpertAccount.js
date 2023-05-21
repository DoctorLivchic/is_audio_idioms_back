import React, { Component } from "react";

//Импорт компонентов
import Header from "../components/header";

function ExpertAccount() {
  const buttons = [
    <p onClick={() => {}}>Заявки на добавление</p>,
    <p onClick={() => {}}>Заявки на редактирование</p>,
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

export default ExpertAccount;
