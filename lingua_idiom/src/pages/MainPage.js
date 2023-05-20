import React, { Component } from "react";

//Импорт компонентов
import Footer from "../components/footer";
import PageBodu from "../components/PageBodu";
import Header from "../components/header";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

class MainPage extends React.Component {
  render() {
    return (
      <div className="doby_MainPage">
        {/* выводим футтер */} 
        <PageBodu/>
        <Header buttons={this.buttons} />
      </div>
    );
  }

  //Передаваемые кнопки в футер
  buttons = [
    <div>
      <p onClick={() => {}}>О нас</p>
    </div>,
    <div>
      <p onClick={() => {}}>Библиотека</p>
    </div>,
    <div>
      <p onClick={() => {}}>Переводчик</p>
    </div>,
    <div>
      <button className="buttonWhite" onClick={() => {}}>
        Войти
      </button>
    </div>,
  ];
}
export default MainPage;
