import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

//Импорт компонентов
import Header from "../components/header";

function ModerAccount() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const buttons = [
    <p onClick={() => {}}>Заявки пользователей</p>,
    <p onClick={() => {}}>Управление фразеологизмами</p>,
    <p onClick={() => {}}>Управление категориями</p>,
    <p onClick={() => {}}>Управление статусами</p>,
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
