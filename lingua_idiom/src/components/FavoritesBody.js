import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import User from "../img/User.png";
import { useEffect, useState } from "react";
import profileDiv from "../img/profileDiv.png";
import { Table, notification, Button, Form, Input, Select, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { supabase } from "../supabase/supabaseClient";

function FavoritesBody() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const [phraseIds, setPhraseIds] = useState([]);
  const [phrase_text, setrequest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const [tag, settag] = useState([]);
  const [sel_tag, setsel_tag] = useState([]);
  const columns = [
    {
      title: "Номер фразы",
      dataIndex: "phrase_id",
      key: "phrase_id",
    },
    {
      title: "Язык перевода",
      dataIndex: "language_id",
      key: "language_id",
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
        .eq("user_id", localStorage.getItem("userID"))

      if (error) console.log("Error fetching user IDs:", error.message);
      else {
        setPhraseIds(data.map((phr_id) => phr_id.phrase_id));
      }
    };

    fetchUserIds();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("phrase_text")
        .select(
          "phrase_text_text, phrase_text_transcription, phrase_text_desc, phrase_id "
        )
        .in("phrase_id", phraseIds);

      console.log(data);
    };

    if (phraseIds.length > 0) fetchOrders();
  }, [phraseIds]);
  // async function getphrase() {
  //   try {
  //     const phraseId = await supabase
  //       .from("favourites_phraseological")
  //       .select("phrase_id")
  //       .eq("user_id", localStorage.getItem("userID"));

  //     const arr = [];
  //     for (let i = 0; i < phraseId.length; i++) {
  //       arr[i] = phraseId[i]["phrase_id"];
  //     }

  //     const phrase = await supabase
  //       .from("phrase_text")
  //       .select(
  //         "phrase_text_text, phrase_text_transcription, phrase_text_desc, phrase_id "
  //       )
  //       .in("phrase_id", arr);

  //     console.log(phraseId);
  //     console.log(arr);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  return (
    <div className="FavoritesBody">
      <Table
        loading={loading}
        dataSource={phrase_text}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record.phrase_text_id}
        onRow={(record) => ({
          onClick: () => {},
        })}
      />
    </div>
  );
}

export default FavoritesBody;
