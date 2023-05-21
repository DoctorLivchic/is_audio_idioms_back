import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

//Импорт компонентов
import Header from "../components/header";

function ModerAccount() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const buttons = [
    <p
      onClick={() => {
        navigate("/");
      }}
    >
      Заявки пользователей
    </p>,
    <p
      onClick={() => {
        navigate("/");
      }}
    >
      Управление фразеологизмами
    </p>,
    <p
      onClick={() => {
        navigate("/");
      }}
    >
      Управление категориями
    </p>,
    <p
      onClick={() => {
        navigate("/");
      }}
    >
      Управление статусами
    </p>,
    <button
      className="buttonWhite"
      onClick={() => {
        signout(() => {
          navigate("/", { replace: true });
        });
      }}
    >
      Выход
    </button>,
  ];
  return (
    <div className="">
      <Header buttons={buttons} />
    </div>
  );
}

export default ModerAccount;
