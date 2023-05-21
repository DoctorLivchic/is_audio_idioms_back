import React, { Component } from "react";

//Импорт компонентов
import Header from "../components/header";
import AboutHeader from "../components/AboutHeader";
import Avatar from "../components/Avatar";

//Импорт картинок
import kostya from "../img/kostya.png";
import maxim from "../img/maxim.png";
import nastya from "../img/nastya.png";
import slava from "../img/slava.png";
import vera from "../img/vera.png";
import vova from "../img/vova.png";
import { useNavigate } from "react-router-dom";

function About(props) {
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
  const avatars = [
    <div>
      <div className="avatarDivChildren">
        <img src={vova} className="avatar" />
        <div className="description">Мартынов Владимир</div>
        <div className="descSmall">Архитектор</div>
      </div>

      <div className="avatarDivChildren">
        <img src={kostya} className="avatar" />
        <div className="description">Лазарев Константин</div>
        <div className="descSmall">Ведущий разработчик</div>
      </div>

      <div className="avatarDivChildren">
        <img src={nastya} className="avatar" />
        <div className="description">Кузнецова Анастасия</div>
        <div className="descSmall">Эксперт по французскому языку</div>
      </div>
    </div>,
    <div>
      <div className="avatarDivChildren">
        <img src={vera} className="avatar" />
        <div className="description">Дудина Вера</div>
        <div className="descSmall">Эксперт по корейскому языку</div>
      </div>

      <div className="avatarDivChildren">
        <img src={maxim} className="avatar" />
        <div className="description">Юров Максим</div>
        <div className="descSmall">Веб-Дизайнер</div>
      </div>

      <div className="avatarDivChildren">
        <img src={slava} className="avatar" />
        <div className="description">Кучумов Вячеслав</div>
        <div className="descSmall">Помощник</div>
      </div>
    </div>,
  ];

  return (
    <div>
      <Header buttons={buttons} />

      <AboutHeader />

      <Avatar image={avatars} />
    </div>
  );
}

export default About;
