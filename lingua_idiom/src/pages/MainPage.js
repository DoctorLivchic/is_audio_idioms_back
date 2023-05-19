import React, { Component } from "react";

//Импорт компонентов
import Footer from "../components/footer";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        {/* выводим футтер */}
        <Footer buttons={this.buttons} />
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
export default MainPage;
