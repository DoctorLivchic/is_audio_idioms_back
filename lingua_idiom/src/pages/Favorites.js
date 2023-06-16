import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, notification, Input, Select, Modal, Form, Button } from "antd";
//Импорт компонентов
import Header from "../components/header";
import FavoritesBody from "../components/FavoritesBody";
import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import { supabase } from "../supabase/supabaseClient";
function UserAccount() {
  const { signout, user } = useAuth();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const buttons = [
    <p
      onClick={() => {
        delete_row();
      }}
    >
      Удалить
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

  async function delete_row() {
    console.log("Вызвали");

    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        const { error } = await supabase
          .from("favourites_phraseological")
          .delete()
          .eq("favourites_phaseological_id", selectedRowKeys.at(i));
        console.log("Запись удалена", selectedRowKeys.at(i));
        notification.open({
          message: "Успешно",
          description: "Запись успешно удаленна",
        });
      } catch (error) {
        notification.open({ message: "Ошибка", description: error.message });
      }
    }
    console.log(selectedRowKeys.length);
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div className="">
      <Header logo={logoHeaderAuthUser} buttons={buttons} />
      <div className="FavoritesBody">
        <FavoritesBody></FavoritesBody>
      </div>
    </div>
  );
}
//Передаваемые кнопки в футер

export default UserAccount;
