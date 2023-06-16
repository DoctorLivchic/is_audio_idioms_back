import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { Table } from "antd";
//Импорт компонентов
import Header from "../components/header";
import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import { supabase } from "../supabase/supabaseClient";

function Library() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [phrase_text, setrequest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => {
      return "Всего " + total;
    },
    onChange: (page, pageSize) => {
      pagination.pageSize = pageSize;
      pagination.current = page;
      GridDataOption.page = page;
      GridDataOption.rowCount = pageSize;
    },
  });
  const columns = [
    {
      title: "Номер фразы",
      dataIndex: "phrase_id",
      key: "phrase_id",
    },
    {
      title: "Дата добавления",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Текст фразеологизма",
      dataIndex: "phrase_text_text",
      key: "phrase_text_text",
    },
    {
      title: "Транскрипция",
      dataIndex: "phrase_text_transcription",
      key: "phrase_text_transcription",
    },
    {
      title: "Описание фразеологизма",
      dataIndex: "phrase_text_desc",
      key: "phrase_text_desc",
    },
  ];

  const GridDataOption = {
    rowCount: 10,
    page: 1,
    orderBy: "phrase_text_id",
    from: "phrase_text",
  };

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
      Войти
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
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    getphrase().then(() => setLoading(false));
  }, [loading]);
  async function getphrase() {
    // const request = await supabase.from("request").select();
    // const data = (await request).data;
    const phraseological = await supabase.from("phrase_text").select();
    const phre = (await phraseological).data;
    const data = await supabase
      .from("phrase_text")
      .select()
      .order("phrase_text_id");
    setrequest(data.data);
  }
  if (user) {
    return (
      <div className="">
        <Header logo={logoHeaderAuthUser} buttons={buttons2} />
        <div className="bodylibrary">
          <Table
            loading={loading}
            dataSource={phrase_text}
            columns={columns}
            pagination={pagination}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <Header logo={logoHeader} buttons={buttons} />
        <div className="bodylibrary">
          <Table
            loading={loading}
            dataSource={phrase_text}
            columns={columns}
            pagination={pagination}
          />
        </div>
      </div>
    );
  }
}
//Передаваемые кнопки в футер

export default Library;
