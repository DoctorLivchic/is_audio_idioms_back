import React, { Component } from "react";

import TranslatorBoby from "../components/TranslatorBoby";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
function Translater() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    <button
      className="buttonWhite"
      onClick={() => {
        navigate("/pages/Authorization");
      }}
    >
      Вход
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
      <div>
        <Header buttons={buttons2} />
        <TranslatorBoby />
      </div>
    );
  } else {
    return (
      <div>
        <Header buttons={buttons} />
        <TranslatorBoby />
      </div>
    );
  }
}

export default Translater;
