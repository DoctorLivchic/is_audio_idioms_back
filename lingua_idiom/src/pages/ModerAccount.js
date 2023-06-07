import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

//Импорт компонентов
import Header from "../components/header";
import ExpertBody from "../components/ExpertBody";
import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";

function ModerAccount() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const buttons = [
    <p
      onClick={() => {
        navigate("/pages/UserApplications");
      }}
    >
      Заявки пользователей
    </p>,
    <p
      onClick={() => {
        navigate("/pages/ManageOfPhrase");
      }}
    >
      Управление фразеологизмами
    </p>,
    <p
      onClick={() => {
        navigate("/pages/ManageOfTag");
      }}
    >
      Управление категориями
    </p>,
    <p
      onClick={() => {
        navigate("/pages/ManageOfStat");
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
    </button>
  ];
  return (
    <div className="">
      <Header logo={logoHeaderAuthOther} buttons={buttons} />
      <ExpertBody></ExpertBody>
    </div>
  );
}

export default ModerAccount;
