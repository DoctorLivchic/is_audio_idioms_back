import React, { Component } from "react";

//Импорт компонентов
import Header from "../components/header";

class ModerAccount extends React.Component {
  render() {
    return (
      <div className="">
        <Header buttons={this.buttons} />
      </div>
    );
  }
  buttons = [
    <p onClick={() => {}}>Заявки пользователей</p>,
    <p onClick={() => {}}>Управление фразеологизмами</p>,
    <p onClick={() => {}}>Управление категориями</p>,
    <p onClick={() => {}}>Управление статусами</p>,
    <button className="buttonWhite" onClick={() => {}}>
      Выход
    </button>,
  ];
}
export default ModerAccount;
