import React, { Component } from "react";

import TranslatorBoby from "../components/TranslatorBoby";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

function Translater() {
  const navigate = useNavigate();
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
  return (
    <div>
      <Header buttons={buttons} />
      <TranslatorBoby />
    </div>
  );
}

export default Translater;
