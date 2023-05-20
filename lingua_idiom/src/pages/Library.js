import React, { Component } from "react";

//Импорт компонентов
import Header from "../components/header";

class Library extends React.Component {
  render() {
    return (
      <div className="">
        <Header buttons={this.buttons} />
      </div>
    );
  }
  //Передаваемые кнопки в футер
  buttons = [
    <p onClick={() => {}}>О нас</p>,
    <p onClick={() => {}}>Библиотека</p>,
    <p onClick={() => {}}>Переводчик</p>,
    <button className="buttonWhite" onClick={() => {}}>
      Войти
    </button>,
  ];
}
export default Library;
