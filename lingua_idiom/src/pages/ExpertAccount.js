import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";

//Импорт компонентов
import Header from "../components/header";

import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import ExpertBody from "../components/ExpertBody";
function ExpertAccount() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const buttons = [
    <p
      onClick={() => {
        navigate("/pages/ExpertAdd");
      }}
    >
      Заявки на добавление
    </p>,
    <p
      onClick={() => {
        navigate("/pages/ExpertEddit");
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
      <Header logo={logoHeaderAuthOther} buttons={buttons} />
      <ExpertBody></ExpertBody>
    </div>
  );
}

export default ExpertAccount;
