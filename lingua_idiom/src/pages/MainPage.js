import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

//Импорт компонентов

import PageBody from "../components/PageBody";
import Header from "../components/header";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

function MainPage() {
  const navigate = useNavigate();
  //Передаваемые кнопки в футер
  const buttons = [
    <p
      onClick={() => {
        navigate("/pages/loginpage");
      }}
    >
      ТестАвторизация
    </p>,
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
  return (
    <div className="body_MainPage">
      <Header buttons={buttons} />
      <PageBody />
    </div>
  );
}

export default MainPage;
