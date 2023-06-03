import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import User from "../img/User.png";
import { useEffect, useState } from "react";
import profileDiv from "../img/profileDiv.png";
import { Table, notification,Button, Form, Input, Select , Modal} from 'antd';
import { useForm } from "antd/es/form/Form";
import { supabase } from "../supabase/supabaseClient";

function FavoritesBody() {
  const navigate = useNavigate();
  const { signout } = useAuth();

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

  useEffect(() => {
    getphrase().then(() => setLoading(false));
  }, [loading]);


  async function getphrase() {
    const phraseological = await supabase.from("favourites_phraseological").select();
    const phre = (await phraseological).data;
    const data = await supabase
      .from("favourites_phraseological")
      .select()
      .order("phrase_text_id");

  }


  return (
    <div className="FavoritesBody">
    
    <Table
        loading={loading}
        dataSource={phrase_text}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record.phrase_text_id}
        onRow={(record) => ({
          onClick: () => {
          
          },
        })}
      />
      
    
    </div>
  );
}

export default FavoritesBody;