import React, { Component } from "react";
//Импорт картинок

class RegistrationBody extends React.Component {
  render() {
    return (
      <div className="authDiv">
        <div className="authDivChild">
          <h1 className="authText">Зарегистрироваться</h1>
          <input className="inputAuth" placeholder="Как вас зовут ?" />
          <input className="inputAuth" placeholder="Электронная почта" />
          <input className="inputAuth" placeholder="Пароль" />
          <input className="inputAuth" placeholder="Повторите пароль" />
        </div>
        <div className="authButtonDiv">
          <button className="RegbuttonWhite">Назад</button>
          <button className="RegbuttonWhite">Зарегистрироваться</button>
        </div>
      </div>
    );
  }
}
export default RegistrationBody;
