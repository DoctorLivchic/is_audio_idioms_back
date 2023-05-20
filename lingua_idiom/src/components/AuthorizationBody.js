import React, { Component } from "react";
//Импорт картинок

class AuthorizationBody extends React.Component {
  render() {
    return (
      <div className="authDiv">
        <div className="authDivChild">
          <h1 className="authText">Войти</h1>
          <div className="inputDiv">
            <input className="inputAuth" placeholder="Электронная почта" />
            <input type="password" className="inputAuth" placeholder="Пароль" />
          </div>
        </div>
        <div className="authButtonDiv">
          <button className="AuthbuttonWhite">Назад</button>
          <button className="AuthbuttonWhite">Войти</button>
        </div>
      </div>
    );
  }
}
export default AuthorizationBody;
