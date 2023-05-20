import React, { Component } from "react";

//Импорт компонентов

import PageBody from "../components/PageBody";
import Header from "../components/header";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

class MainPage extends React.Component {
  render() {
    return (
      <div className="body_MainPage">
        <Header buttons={this.buttons} />
        <PageBody />
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
