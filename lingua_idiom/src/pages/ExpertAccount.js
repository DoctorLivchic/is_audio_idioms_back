import React, { Component } from "react";

//Импорт компонентов
import Header from "../components/header";

class ExpertAccount extends React.Component {
  render() {
    return (
      <div className="">
        <Header buttons={this.buttons} />
      </div>
    );
  }
  buttons = [
    <p onClick={() => {}}>Заявки на добавление</p>,
    <p onClick={() => {}}>Заявки на редактирование</p>,
    <button className="buttonWhite" onClick={() => {}}>
      Выход
    </button>,
  ];
}
export default ExpertAccount;
