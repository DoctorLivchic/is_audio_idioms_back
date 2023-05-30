import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { useEffect, useState } from "react";
import { Table, notification,Button, Form, Input, Select , Modal} from 'antd';
import { useForm } from "antd/es/form/Form";
//Импорт компонентов
import Header from "../components/header";
import { supabase } from "../supabase/supabaseClient";
import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";

function ExpertAdd() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const [request, setrequest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Номер запроса",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "Пользователь",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Русский перевод",
      dataIndex: "rus_request",
      key: "rus_request",
    },
    {
      title: "Французский перевод",
      dataIndex: "fre_request",
      key: "fre_request",
    },
    {
      title: "Корейский перевод",
      dataIndex: "kor_request",
      key: "kor_request",
    },
    {
      title: "Статус запроса",
      dataIndex: "status_id",
      key: "status_id",
    },
    {
      title: "Вид операции",
      dataIndex: "type_id",
      key: "type_id",
    },
    {
      title: "Категория",
      dataIndex: "tag_id",
      key: "tag_id",
    },
    {
      title: "Ссылка на источник",
      dataIndex: "link_phraseological",
      key: "link_phraseological",
    },
  ];
  
  const GridDataOption = {
    rowCount: 10,
    page: 1,
    orderBy: "request_id",
    from: "request",
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
    getrequest().then(() => setLoading(false));
  }, [loading]);

  async function getrequest() {
    // const request = await supabase.from("request").select();
    // const data = (await request).data;
    const request = await supabase.from("request").select();
    const req = (await request).data;
    const data = await supabase
      .from("request")
      .select()
      .eq("type_id", `${1}`)
      .eq("status_id", `${4}`)
      .order('request_id')
    setrequest(data.data);
  }

  function update() {
    getrequest();
  }

  async function delete_row() {
    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        const { error } = await supabase
          .from("request")
          .delete()
          .eq("request_id", selectedRowKeys.at(i));
        console.log("Запись удалена", selectedRowKeys.at(i));
        notification.open({
          message: "Успешно",
          description: "Запись успешно удаленна",
        });
      } catch (error) {
        notification.open({ message: "Ошибка", description: error.message });
      }
    }
    getrequest();
    update();
  }

  async function add_request() {
    const request = await supabase.from("request").select();
    const adde = (await request).data;

    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        //получаем выбранную фразу(ы)
        const phrase = await supabase
          .from("request")
          .select()
          .eq("request_id", selectedRowKeys.at(i));
        console.log(phrase.data[0]["request_id"]); //обращение к полю возвращаемого объекта из таблицы
        //------------------------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------------------
        console.log(phrase.data[0]["request_id"]); //обращение к полю возвращаемого объекта из таблицы
        //------------------------------------------------------------------------------------------------------------
        // //Обновляем поле update_at
        // var update1 = ((new Date()).toISOString()).toLocaleString();
        // const { error1 } = await supabase
        //   .from('request')
        //   .update({status_id:'3',update_at:(update1)})
        //   .eq('request_id',selectedRowKeys.at(i));
        //------------------------------------------------------------------------------------------------------------
        //Добавляем одобренный запрос в таблицу с фразеологизмами

        //Добавляем новую запись в таблицу phraseological
        var update1 = new Date().toISOString().toLocaleString();

        const { error } = await supabase
          .from("phraseological")
          .insert({ updated_at: update1 });

        //Получаем последний phrase_id
        const id = await supabase.from("phraseological").select("phrase_id");
        let max = -10;
        for (let i = 0; i < id.data.length; i++) {
          console.log(id.data[i]["phrase_id"]);
          if (id.data[i]["phrase_id"] > max) {
            max = id.data[i]["phrase_id"];
          }
        }

        for (let i = 1; i < 4; i++) {
          let lang = "";
          if (i == 1) {
            lang = "rus_request";
          } else if (i == 2) {
            lang = "kor_request";
          } else {
            lang = "fre_request";
          }
          // console.log(phrase.data[0][lang])
          const { error } = await supabase.from("phrase_text").insert({
            phrase_id: max,
            language_id: i,
            phrase_text_text: phrase.data[0][lang],
          });
        }
        update1 = new Date().toISOString().toLocaleString();
        const { error1 } = await supabase
          .from("request")
          .update({ status_id: "3", update_at: update1 })
          .eq("request_id", selectedRowKeys.at(i));
        //------------------------------------------------------------------------------------------------------------
        notification.open({
          message: "УСПЕШНО",
          description: "Запрос был успешно добавлен в систему!",
        });
        console.log("Запись добавленна");
        update();
      } catch (error) {
        notification.open({ message: "Ошибка", description: error.message });
        update();
      }
    }
  }

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
        update();
      }}
    >
        Обновить
    </p>,
     <p
     onClick={() => {
        add_request();
     }}
   >
        Добавить запись
   </p>,
    <button
      className="buttonWhite"
      onClick={() => {
        signout(() => navigate("/pages/ExpertAccount", { replace: true }));
      }}
    >
      Назад
    </button>,
  ];

  return (
    <div className="">
      <Header logo={logoHeaderAuthOther} buttons={buttons} />
<div className="bodyApp">
      <Table
        loading={loading}
        dataSource={request}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record.request_id}
        onRow={(record) => ({
          onClick: () => {},
        })}
      />
</div>
    </div>
  );
}

export default ExpertAdd;