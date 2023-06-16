import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, notification,Input, Select , Modal, Form ,Button} from 'antd';
//Импорт компонентов
import { useForm } from "antd/es/form/Form";
import Header from "../components/header";
import FavoritesBody from "../components/FavoritesBody";
import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import { supabase } from "../supabase/supabaseClient";
function UserAccount() {
  const { signout, user } = useAuth();
  const navigate = useNavigate();
  const [phraseIds, setPhraseIds] = useState([]);
  const [phrase_text, setrequest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const [tag, settag] = useState([]);
  const [sel_tag, setsel_tag] = useState([]);
  const[pagination]=useState({
    current:1,
    pageSize:10,
    showSizeChanger:true,
    showTotal:(total)=>{
      return "Всего "+total
    },
    onChange:(page,pageSize)=>{
      pagination.pageSize=pageSize;
      pagination.current=page;
      GridDataOption.page=page;
      GridDataOption.rowCount=pageSize;

    }
  })
  const columns = [
    {
      title: "Номер фразы",
      dataIndex: "phrase_id",
      key: "phrase_id",
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
  }
  const GridDataOption = {
    rowCount: 30,
    page: 1,
    orderBy: "phrase_id",
    from: "phrase_text",
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // useEffect(() => {
  //   getphrase().then(() => setLoading(false));
  // }, [loading]);

  useEffect(() => {
    const fetchUserIds = async () => {
      const { data, error } = await supabase
        .from("favourites_phraseological")
        .select("phrase_id, language_id")
        .eq("user_id", localStorage.getItem("userID"));

      if (error) console.log("Error fetching user IDs:", error.message);
      else {
        setPhraseIds(data.map((phr_id) => phr_id.phrase_id));
      }
    };

    fetchUserIds();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await supabase
        .from("phrase_text")
        .select(
          "phrase_text_text, phrase_text_transcription, phrase_text_desc, phrase_id"
        )
        .in("phrase_id", phraseIds)
        .order("phrase_id", { ascending: true });

      setrequest(data.data);
    };

    if (phraseIds.length > 0) fetchOrders();
    fetchOrders().then(() => setLoading(false));
  }, [phraseIds, loading]);

  return (
    <div className="">
      <Header logo={logoHeaderAuthUser} buttons={buttons} />
      <div className="FavoritesBody">
      <div className="FavoritesBody">
      <Table
        loading={loading}
        dataSource={phrase_text}
        pagination={pagination}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record.phrase_id}
        onRow={(record) => ({
          onClick: () => {},
        })}
      />
    </div>
      </div>
    </div>
  );
}
//Передаваемые кнопки в футер

export default UserAccount;