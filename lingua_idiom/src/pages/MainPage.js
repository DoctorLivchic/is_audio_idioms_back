import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";

//Импорт компонентов
import PageBody from "../components/PageBody";
import Header from "../components/header";

//Импорт лого
import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

function MainPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log();
  //Передаваемые кнопки в футер
  const buttons = [
    <p
      onClick={() => {
        navigate("/pages/About");
      }}
    >
      О нас
    </p>,
    <p
      onClick={() => {
        navigate("/pages/Library");
      }}
    >
      Библиотека
    </p>,
    <p
      onClick={() => {
        navigate("/pages/Translater");
      }}
    >
      Переводчик
    </p>,
    <button
      className="buttonWhite"
      onClick={() => {
        navigate("/pages/Authorization");
      }}
    >
      Войти
    </button>,
  ];

  const buttons2 = [
    <p
      onClick={() => {
        navigate("/pages/About");
      }}
    >
      О нас
    </p>,
    <p
      onClick={() => {
        navigate("/pages/Library");
      }}
    >
      Библиотека
    </p>,
    <p
      onClick={() => {
        navigate("/pages/Translater");
      }}
    >
      Переводчик
    </p>,
    <button
      className="buttonWhite"
      onClick={() => {
        navigate("/pages/UserAccount");
      }}
    >
      Профиль
    </button>,
  ];

  if (user) {
    return (
      <div className="body_MainPage">
        <Header logo={logoHeaderAuthUser} buttons={buttons2} />
        <PageBody />
      </div>
    );
  } else {
    return (
      <div className="body_MainPage">
        <Header logo={logoHeader} buttons={buttons} />
        <PageBody />
      </div>
    );
  }
}

export default MainPage;
