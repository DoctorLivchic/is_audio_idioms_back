import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, notification, Input, Select, Modal, Form, Button } from "antd";
//Импорт компонентов
import Header from "../components/header";
import ProfileDivTemp from "../components/profileDivTemp";
import logoHeader from "../img/logo_header_logout2.png";
import logoHeaderAuthUser from "../img/logoHeaderAuthUser.png";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import { supabase } from "../supabase/supabaseClient";
import { useForm } from "antd/es/form/Form";

function Requests() {
  const { signout, user } = useAuth();
  const [request, setrequest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdding, setshowAdding] = useState(false);
  const [showUpdating, setshowUpdating] = useState(false);
  const [form] = useForm();
  const [tag, settag] = useState([]);
  const [sel_tag, setsel_tag] = useState([]);
  const [lidesc, setlidesc] = useState([]);
  const [litranscEnter, setlitranscEnter] = useState([]);
  const [id, setid] = useState([]);
  const [translitExit, settranslitExit] = useState([]);
  const { TextArea } = Input;
  const navigate = useNavigate();
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
      title: "Номер запроса",
      dataIndex: "request_id",
      key: "request_id",
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
  ];

  const GridDataOption = {
    rowCount: 10,
    page: 1,
    orderBy: "request_id",
    from: "request",
  };
  const buttons = [
    <p
      onClick={() => {
        change_phrase1();
      }}
    >
      Изменить фразеологизм
    </p>,
    <p
      onClick={() => {
        change_phrase();
      }}
    >
      Дабавить фразеологизм
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
  useEffect(() => {
    getrequest().then(() => setLoading(false));
    gettags();
  }, [loading]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setsel_tag(value);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //Валидация руского перевода
  function validrus(rus_request) {
    var re = /^[А-ЯЁ\s]+$/i;
    var valid = re.test(rus_request);
    return valid;
  }

  //Валидация французского перевода
  function validfre(rus_request) {
    var re = /^[A-Z\s]+$/i;
    var valid = re.test(rus_request);
    return valid;
  }

  //Валидация корейского перевода
  function validkor(rus_request) {
    var re = /^[ㄱ-모\s]+$/i;
    var valid = re.test(rus_request);
    return valid;
  }

  // -----------------------------------------------

  async function TranslateFunction() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст к переводу
    if (firstText == "") {
      notification.open({
        message: "Внимание!",
        description:
          "Введите введите фразеологизм который вы хотите найти в текстовое поле!",
      });
    } else {
      if (firstText == "") {
        document.getElementById("textAreaExit").value = "";
      } else {
        //Получаем айди фразеологизма с которого переводим
        const phrase = await supabase
          .from("phrase_text")
          .select()
          .eq("phrase_text_text", firstText);

        try {
          //Получаем фразеологизм на языке, который выбран к переводу
          const translate = await supabase
            .from("phrase_text")
            .select()
            .eq("phrase_id", phrase.data[0]["phrase_id"])
            .eq("language_id", 1);

          setid(translate.data[0]["phrase_id"]);
          const translatekor = await supabase
            .from("phrase_text")
            .select()
            .eq("phrase_id", phrase.data[0]["phrase_id"])
            .eq("language_id", 2);
          document.getElementById("logkor").value =
            translatekor.data[0]["phrase_text_text"];

          const translatefre = await supabase
            .from("phrase_text")
            .select()
            .eq("phrase_id", phrase.data[0]["phrase_id"])
            .eq("language_id", 3);
          document.getElementById("logfre").value =
            translatefre.data[0]["phrase_text_text"];
          //settranslitExit(translate.data[0]["phrase_text_text"]);
          const translate1 = await supabase
            .from("phraseological")
            .select()
            .eq("phrase_id", phrase.data[0]["phrase_id"]);

          document.getElementById("link").value =
            translate1.data[0]["link_phraseological"];
          document.getElementById("log_rus_tr").value =
            translate.data[0]["phrase_text_transcription"];
          document.getElementById("log_rus_desc").value =
            translate.data[0]["phrase_text_desc"];
          document.getElementById("tag_id").value =
            translate1.data[0]["tag_id"];
          //то выводим во второй текстБокс перевод по выбранному языку к переводу
          document.getElementById("logrus").value =
            translate.data[0]["phrase_text_text"];
        } catch (error) {
          notification.open({
            message: "Простите!",
            description:
              "Мы не нашли нужного Вам фразеологизма. Вы всегда можете отправить нам запрос на добавление нового фразеологизма в Личном кабинете!",
          });
        }
      }
    }
  }

  function cancel() {
    setshowAdding(false);
    setshowUpdating(false);
  }
  async function change_phrase() {
    setshowAdding(true);
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
    console.log("Точка2");
    update();
  }

  async function change_phrase1() {
    setshowUpdating(true);
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
    console.log("Точка2");
    update();
  }

  async function gettags() {
    const tags = await supabase.from("tags").select();
    const tag = (await tags).data;
    const data_tag = await supabase.from("tags").select();
    settag(data_tag.data);
    return data_tag;
  }

  async function getrequest() {
    let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
    console.log(userID);
    // const request = await supabase.from("request").select();
    // const data = (await request).data;
    try {
      const request = await supabase.from("request").select();
      const req = (await request).data;
      const data = await supabase
        .from("request")
        .select()
        .eq("user_id", `${parseInt(userID)}`)
        .order("request_id");
        for (let i = 0; i < data.data.length; i++) { 
          if (data.data[i]["type_id"] == 0) {
            data.data[i]["type_id"] = "Редактирование";
          } else if ((data.data[i]["type_id"] == 1)) {
            data.data[i]["type_id"] = "Добавление";}

            if (data.data[i]["status_id"] == 1) {
              data.data[i]["status_id"] = "Новое";
            } else if ((data.data[i]["status_id"] == 2)) {
              data.data[i]["status_id"] = "Отклонено";}
              else if ((data.data[i]["status_id"] == 3)) {
                data.data[i]["status_id"] = "Принято";}
                else if ((data.data[i]["status_id"] == 4)) {
                  data.data[i]["status_id"] = "Обработанно";}


                  if (data.data[i]["tag_id"] == 1) {
                    data.data[i]["tag_id"] = "Влияние на человека";}  
                    else if ((data.data[i]["tag_id"] == 2)) {
                      data.data[i]["tag_id"] = "внешность человека";}
                      else if ((data.data[i]["tag_id"] == 3)) {
                        data.data[i]["tag_id"] = "действия человека";}
                        else if ((data.data[i]["tag_id"] == 5)) {
                          data.data[i]["tag_id"] = "другое";}
                          else if ((data.data[i]["tag_id"] == 6)) {
                            data.data[i]["tag_id"] = "количество";}
                            else if ((data.data[i]["tag_id"] == 7)) {
                              data.data[i]["tag_id"] = "негативные привычки";}
                              else if ((data.data[i]["tag_id"] == 9)) {
                                data.data[i]["tag_id"] = "описание человека";}
                                else if ((data.data[i]["tag_id"] == 10)) {
                                  data.data[i]["tag_id"] = "отличительные черты человека";}
                                  else if ((data.data[i]["tag_id"] == 11)) {
                                    data.data[i]["tag_id"] = "поведение человека";}
                                    else if ((data.data[i]["tag_id"] == 12)) {
                                      data.data[i]["tag_id"] = "поступки человека";}
                                      else if ((data.data[i]["tag_id"] == 13)) {
                                        data.data[i]["tag_id"] = "предпочтение человека ";}
                                        else if ((data.data[i]["tag_id"] == 14)) {
                                          data.data[i]["tag_id"] = "состояние человека";}
                                          else if ((data.data[i]["tag_id"] == 15)) {
                                            data.data[i]["tag_id"] = "социальные отношения";}
                                            else if ((data.data[i]["tag_id"] == 16)) {
                                              data.data[i]["tag_id"] = "характер человека";}
                                              else if ((data.data[i]["tag_id"] == 18)) {
                                                data.data[i]["tag_id"] = "коммуникация";}
                                                else if ((data.data[i]["tag_id"] == 19)) {
                                                  data.data[i]["tag_id"] = "описание ситуации";}
                                                  else if ((data.data[i]["tag_id"] == 20)) {
                                                    data.data[i]["tag_id"] = "характер действия";}



        }


      setrequest(data.data); 
    } catch (error) {
      console.log(error)
      
    }
  }

  async function add_phrase() {
    const rus1 = form.getFieldValue("rus");
    const fre1 = form.getFieldValue("fre");
    const kor1 = form.getFieldValue("kor");
    const tag = form.getFieldValue("tag_id");
    let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
    console.log(fre1);
    if (rus1 != null) {
      if (fre1 != null) {
        if (kor1 != null) {
          try {
            const { error } = await supabase.from("request").insert({
              rus_request: rus1,
              fre_request: fre1,
              kor_request: kor1,
              status_id: 1,
              type_id: 0,
              user_id: parseInt(userID),
              tag_id: tag,
            });
          } catch (error) {
            alert(error.error_description || error.message);
          }
          notification.open({
            message: "Успешно",
            description: "Вы успешно добавили запрос!",
          });
          setshowAdding(false);
        } else {
          notification.open({
            message: "Ошибка",
            description: "Вы ввели некорректный корейский перевод!",
          });
        }
      } else {
        notification.open({
          message: "Ошибка",
          description: "Вы ввели некорректный французский перевод!",
        });
      }
    } else {
      notification.open({
        message: "Ошибка",
        description: "Вы ввели некорректный русский перевод!",
      });
    }
  }

  function update() {
    setLoading(true);
  }

  //Регистрация нового Запроса(редактирование)
  async function editrequest() {
    const rus1 = form.getFieldValue("rus");
    const fre1 = form.getFieldValue("fre");
    const kor1 = form.getFieldValue("kor");
    const tag = form.getFieldValue("tag_id");
    let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
    //Запись
    if (rus1 != null) {
      if (fre1 != null) {
        if (kor1 != null) {
          try {
            const { error } = await supabase.from("request").insert({
              rus_request: rus1,
              fre_request: fre1,
              kor_request: kor1,
              status_id: 1,
              type_id: 0,
              user_id: parseInt(userID),
              tag_id: tag,
              phrase_id: id,
            });
          } catch (error) {
            alert(error.error_description || error.message);
          }
          notification.open({
            message: "Успешно",
            description: "Вы успешно добавили запрос!",
          });
          setshowUpdating(false);
        } else {
          notification.open({
            message: "Ошибка",
            description: "Вы ввели некорректный корейский перевод!",
          });
        }
      } else {
        notification.open({
          message: "Ошибка",
          description: "Вы ввели некорректный французский перевод перевод!",
        });
      }
    } else {
      notification.open({
        message: "Ошибка",
        description: "Вы ввели некорректный русский перевод!",
      });
    }
  }

  return (
    <div className="">
      <Header logo={logoHeaderAuthUser} buttons={buttons} />
      {/* Модальное окно для добавления фразеологизма */}
      <Modal
        open={showAdding}
        title="Добавление фразеологизма"
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
                required: false,
                message: "фразеологизм не может быть пустым",
              },
            ]}
          >
            <Input name="rus" id="logrus" placeholder="Русский фразеологизм" />
          </Form.Item>

          <Form.Item
            name="kor"
            label="Корейский фразеологизм"
            rules={[
              {
                required: false,
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

          <Form.Item
            name="fre"
            label="Французский фразеологизм"
            rules={[
              {
                required: false,
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

          <Form.Item name="rus_tr" label="Транскрипция фразеологизма">
            <Input
              name="rus_tr"
              id="log_rus_tr"
              placeholder="Транскрипция фразеологизма"
            />
          </Form.Item>
          <Form.Item name="rus_desc" label="Описание фразеологизма">
            <Input
              name="rus_desc"
              id="log_rus_desc"
              placeholder="Описание фразеологизма"
            />
          </Form.Item>

          <Form.Item
            name="link_phraseologikal"
            label="Ссылка на фразеологизм"
            rules={[
              {
                required: false,
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
      {/* Модельное окно для обновления --------------------------------------------*/}

      <Modal
        open={showUpdating}
        title="Обновление фразеологизма"
        onCancel={cancel}
        footer={[
          <Button onClick={TranslateFunction}>Найти</Button>,
          <Button onClick={editrequest}>Добавить</Button>,
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
          <Form.Item>
            <TextArea
              className="txt"
              id="textAreaEnter"
              maxLength={100}
              style={{ height: "70px" }}
              placeholder="Введите текст для перевода"
            />
          </Form.Item>
          <Form.Item
            name="rus"
            label="Русский фразеологизм"
            rules={[
              {
                required: true,
                message: "фразеологизм не может быть пустым",
              },
            ]}
            value={translitExit}
          >
            <Input name="rus" id="logrus" value={translitExit} />
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
              value={translitExit}
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
              value={translitExit}
            />
          </Form.Item>

          <Form.Item name="rus_tr" label="Транскрипция фразеологизма">
            <Input
              name="rus_tr"
              id="log_rus_tr"
              placeholder="Транскрипция фразеологизма"
              value={litranscEnter}
            />
          </Form.Item>
          <Form.Item name="rus_desc" label="Описание фразеологизма">
            <TextArea
              name="rus_desc"
              id="log_rus_desc"
              placeholder="Описание фразеологизма"
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
              id="link"
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
              id="tag_id"
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

      <div className="bodyApp">
        <Table
          loading={loading}
          pagination={pagination}
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
//Передаваемые кнопки в футер

export default Requests;
