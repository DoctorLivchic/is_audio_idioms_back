import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { useEffect, useState } from "react";
import { Table, notification,Button, Form, Input, Select , Modal} from 'antd';
import { useForm } from "antd/es/form/Form";

//Импорт компонентов
import Header from "../components/header";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import { supabase } from "../supabase/supabaseClient";


function ManageOfPhrase() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [phrase_text, setrequest] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = useForm();
    const [tag, settag] = useState([]);
    const [sel_tag, setsel_tag] = useState([]);

    const columns = [
        {
          title: "Номер текста фразеологизма",
          dataIndex: "phrase_text_id",
          key: "phrase_text_id",
        },
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
        gettags();
      }, [loading]);

      function update() {
        setLoading(true);
      }

      const handleChange = (value) => {
        console.log(`selected ${value}`);
        setsel_tag(value);
      };
      function cancel() {
        setShow(false);
      }

      async function gettags() {
        const tags = await supabase.from("tags").select();
        const tag = (await tags).data;
        const data_tag = await supabase.from("tags").select();
        settag(data_tag.data);
        return data_tag;
      }

      async function getphrase() {
        const phraseological = await supabase.from("phrase_text").select();
        const phre = (await phraseological).data;
        const data = await supabase
          .from("phrase_text")
          .select()
          .order("phrase_text_id");
        setrequest(data.data);
      }

//------------------------------------------------------------------
async function delete_row() {
    const phrase_text = await supabase.from("phrase_text").select();
    const data1 = (await phrase_text).data;
    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        const { error } = await supabase
          .from("phrase_text")
          .delete()
          .eq("phrase_text_id", selectedRowKeys.at(i));
        notification.open({
          message: "Успешно",
          description: "запись поставленна на удаление",
        });
        console.log("Запись удалена", selectedRowKeys.at(i));
      } catch (error) {
        notification.open({ message: "Ошибка", description: error.message });
      }
    }
    getphrase();
    update();
  }

//------------------------------------------------------------------
async function change_phrase() {
    setShow(true);
    for (let i = 0; i < selectedRowKeys.length; i++) {
      try {
        const data = await supabase.from("phraseological").select();
        form.setFields(
          Object.keys(data).map((key) => ({
            name: key,
            value: data[key],
          }))
        );
        console.log("Точка");
      } catch (error) {
        notification.open({ message: "Ошибка", description: error.message });
        console.log("Точка1");
      }
    }
    getphrase();
    console.log("Точка2");
    update();
  }

  async function add_phrase() {
    const rus1 = form.getFieldValue("rus");
    const rus_tr1 = form.getFieldValue("rus_tr");
    const rus_desc1 = form.getFieldValue("rus_desc");
    const fre1 = form.getFieldValue("fre");
    const fre_tr1 = form.getFieldValue("fre_tr");
    const fre_desc1 = form.getFieldValue("fre_desc");
    const kor1 = form.getFieldValue("kor");
    const kor_tr1 = form.getFieldValue("kor_tr");
    const kor_desc1 = form.getFieldValue("kor_desc");
    const link = form.getFieldValue("link_phraseologikal");

    try {
      var update1 = new Date().toISOString().toLocaleString();

      const { error } = await supabase.from("phraseological").insert({
        updated_at: update1,
        link_phraseological: link,
        tag_id: sel_tag,
      });

      //Получаем последний phrase_id
      const id = await supabase.from("phraseological").select("phrase_id");
      let max = -10;
      for (let i = 0; i < id.data.length; i++) {
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
      }
      const { error1 } = await supabase.from("phrase_text").insert([
        {
          phrase_id: max,
          language_id: 1,
          phrase_text_text: rus1,
          phrase_text_transcription: rus_tr1,
          phrase_text_desc: rus_desc1,
        },
        {
          phrase_id: max,
          language_id: 2,
          phrase_text_text: kor1,
          phrase_text_transcription: kor_tr1,
          phrase_text_desc: kor_desc1,
        },
        {
          phrase_id: max,
          language_id: 3,
          phrase_text_text: fre1,
          phrase_text_transcription: fre_tr1,
          phrase_text_desc: fre_desc1,
        },
      ]);

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
            change_phrase();
        }}
      >
       Добавить
      </p>,
      <button
        className="buttonWhite"
        onClick={() => {
          signout(() => {
            navigate("/pages/ModerAccount", { replace: true });
          });
        }}
      >
        Выход
      </button>,
    ];
    return (
      <div className="">
        <Header logo={logoHeaderAuthOther} buttons={buttons} />
        <div className="bodyApp">
        <Modal
        open={show}
        title="Изменение фразеологизма"
        onCancel={cancel}
        footer={[
          <Button onClick={add_phrase}>Добавить</Button>,
          <Button onClick={cancel}>Назад</Button>,
        ]}
      >
        <Form
          form={form}
          layout={"vertical"}
          centered={true}
          name="formRegistry"
          style={{ padding: 20 }}
        >
          <Form.Item
            name="rus"
            label="Русский фразеологизм"
            rules={[
              {
                required: true,
                message: "фразеологизм не может быть пустым",
              },
            ]}
          >
            <Input name="rus" id="logrus" placeholder="Русский фразеологизм" />
          </Form.Item>
          <Form.Item name="rus_tr" label="Транскрипция русского фразеологизма">
            <Input
              name="rus_tr"
              id="log_rus_tr"
              placeholder="Транскрипция русского фразеологизма"
            />
          </Form.Item>
          <Form.Item name="rus_desc" label="Описание русского фразеологизма">
            <Input
              name="rus_desc"
              id="log_rus_desc"
              placeholder="Описание русского фразеологизма"
            />
          </Form.Item>

          <Form.Item
            name="kor"
            label="Корейский фразеологизм"
            rules={[
              {
                required: true,
                message: "Корейский не может быть пустым",
              },
            ]}
          >
            <Input
              name="kor"
              placeholder="Корейский фразеологизм"
              id="logkor"
            />
          </Form.Item>
          <Form.Item name="kor_tr" label="Транскрипция корейкого фразеологизма">
            <Input
              name="kor_tr"
              id="log_kor_tr"
              placeholder="Транскрипция корейского фразеологизма"
            />
          </Form.Item>

          <Form.Item name="kor_desc" label="Описание корейского фразеологизма">
            <Input
              name="fre_kor"
              id="log_kor_desc"
              placeholder="Описание корейского фразеологизма"
            />
          </Form.Item>

          <Form.Item
            name="fre"
            label="Французский фразеологизм"
            rules={[
              {
                required: true,
                message: "фразеологизм не может быть пустым",
              },
            ]}
          >
            <Input
              name="fre"
              placeholder="Французский фразеологизм"
              id="logfre"
            />
          </Form.Item>
          <Form.Item
            name="fre_tr"
            label="Транскрипция французского фразеологизма"
          >
            <Input
              name="fre_tr"
              id="log_fre_tr"
              placeholder="Транскрипция французского фразеологизма"
            />
          </Form.Item>

          <Form.Item
            name="fre_desc"
            label="Описание французского фразеологизма"
          >
            <Input
              name="fre_desc"
              id="log_fre_desc"
              placeholder="Описание французского фразеологизма"
            />
          </Form.Item>

          <Form.Item
            name="link_phraseologikal"
            label="Ссылка на фразеологизм"
            rules={[
              {
                required: true,
                message: "Укажите источник фразеологизма",
              },
            ]}
          >
            <Input
              name="link_phraseologikal"
              placeholder="Ссылка на фразеологизм"
            />
          </Form.Item>
          <Form.Item
            name="tag_id"
            label="Тематика фразеологизма"
            rules={[
              {
                required: true,
                message: "Укажите категорию фразеологизма",
              },
            ]}
          >
            <Select
              name="tag_id"
              defaultValue="Выберите значение"
              onChange={handleChange}
              options={tag?.map((tag) => {
                return {
                  label: tag.tag_name,
                  value: tag.tag_id,
                };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
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
      </div>
    );
  }
  
  export default ManageOfPhrase;