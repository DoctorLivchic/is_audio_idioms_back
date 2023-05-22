import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
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

function About(props) {
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
  const avatars = [
    <div>
      <div className="avatarDivChildren">
      <a href="https://vk.com/w0ldemar">
        <img src={vova} className="avatar" />
        </a>
        <div className="description">
          Мартынов Владимир <div className="descSmall">Архитектор</div>
        </div>
      </div>

      <div className="avatarDivChildren">
      <a href="https://vk.com/klazarev1">
        <img src={kostya} className="avatar" />
      </a>
        <div className="description">
          Лазарев Константин<div className="descSmall">Ведущий разработчик</div>
        </div>
      </div>

      <div className="avatarDivChildren">
        <a href="https://vk.com/id64210580">
        <img src={nastya} className="avatar" />
        </a>
        <div className="description">
          Кузнецова Анастасия
          <div className="descSmall">Эксперт по французскому языку</div>
        </div>
      </div>
    </div>,
    <div>
      <div className="avatarDivChildren">
      <a href="https://vk.com/verramishka">
        <img src={vera} className="avatar" />
        </a>
        <div className="description">
          Дудина Вера{" "}
          <div className="descSmall">Эксперт по корейскому языку</div>
        </div>
      </div>

      <div className="avatarDivChildren">
      <a href="https://vk.com/itcudbeworse">
        <img src={maxim} className="avatar" />
        </a>
        <div className="description">
          Юров Максим <div className="descSmall">Веб-Дизайнер</div>
        </div>
      </div>

      <div className="avatarDivChildren">
      <a href="https://vk.com/bravosexgoingdaun">
        <img src={slava} className="avatar" />
        </a>
        <div className="description">
          Кучумов Вячеслав <div className="descSmall">Помощник</div>
        </div>
      </div>
    </div>,
  ];

  if (user) {
    return (
      <div>
        <Header buttons={buttons2} />

        <div className="mainDiv2blocks">
          <AboutHeader />

          <Avatar image={avatars} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header buttons={buttons} />

        <div className="mainDiv2blocks">
          <AboutHeader />

          <Avatar image={avatars} />
        </div>
      </div>
    );
  }
}

export default About;
