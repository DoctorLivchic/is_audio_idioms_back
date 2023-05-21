import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";

//Импорт компонентов
import Header from "../components/header";

function ExpertAccount() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const buttons = [
    <p
      onClick={() => {
        navigate("/");
      }}
    >
      Заявки на добавление
    </p>,
    <p
      onClick={() => {
        navigate("/");
      }}
    >
      Заявки на редактирование
    </p>,
    <button
      className="buttonWhite"
      onClick={() => {
        signout(() => navigate("/", { replace: true }));
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

export default ExpertAccount;
