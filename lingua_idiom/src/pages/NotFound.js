import React, { Component } from "react";
import { Link } from "react-router-dom";

//Импорт компонентов
import Header from "../components/header";

class NotFound extends React.Component {
  render() {
    return (
      <div className="">
        <Header buttons={this.buttons} />
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
  //Передаваемые кнопки в футер
  buttons = [
    <p onClick={() => {}}>О нас</p>,
    <p onClick={() => {}}>Библиотека</p>,
    <p onClick={() => {}}>Переводчик</p>,
    <button className="buttonWhite" onClick={() => {}}>
      Выход
    </button>,
  ];
}
export default NotFound;