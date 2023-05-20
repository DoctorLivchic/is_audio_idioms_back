import React, { Component } from "react";

import TranslatorBoby from "../components/TranslatorBoby";
import Header from "../components/header";

class Translater extends React.Component {
  render() {
    return (
      <div>
        <Header buttons={this.buttons} />

        <TranslatorBoby />
      </div>
    );
  }
  buttons = [
    <p onClick={() => {}}>О нас</p>,
    <p onClick={() => {}}>Библиотека</p>,
    <button className="buttonWhite" onClick={() => {}}>
      Вход
    </button>,
  ];
}
export default Translater;
