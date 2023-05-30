import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, notification,Input, Select , Modal, Form ,Button} from 'antd';
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

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [form] = useForm();
  const [tag, settag] = useState([]);
  const [sel_tag, setsel_tag] = useState([]);

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Номер запроса',
      dataIndex: 'request_id',
      key: 'request_id'
    },
    {
      title: 'Русский перевод',
      dataIndex: 'rus_request',
      key: 'rus_request'
    },
    {
      title: 'Французский перевод',
      dataIndex: 'fre_request',
      key: 'fre_request'
    },
    {
      title: 'Корейский перевод',
      dataIndex: 'kor_request',
      key: 'kor_request'
    },
    {
      title: 'Статус запроса',
      dataIndex: 'status_id',
      key: 'status_id'
    },
    {
      title: 'Вид операции',
      dataIndex: 'type_id',
      key: 'type_id'
    },
    {
      title: 'Категория',
      dataIndex: 'tag_id',
      key: 'tag_id'
    }
  ]


const GridDataOption = {
    rowCount: 10,
    page: 1,
    orderBy: 'request_id',
    from: 'request'
  }
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
    getrequest().then(() => setLoading(false)); gettags();
  }, [loading]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setsel_tag(value);
  };

const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
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



  function cancel() {
    setShow(false);
    setShow1(false);
  }

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
    console.log("Точка2");
    update();
  }

  async function change_phrase1() {
    setShow1(true);
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
    console.log(userID)
    // const request = await supabase.from("request").select();
    // const data = (await request).data;
    const request = await supabase.from("request").select();
    const req = (await request).data;
    const data = await supabase
      .from('request')
      .select()
      .eq('user_id', `${parseInt(userID)}`)
      .order('request_id')
    setrequest(data.data)
  }


  async function add_phrase() {
    const rus1 = form.getFieldValue("rus");
    const fre1 = form.getFieldValue("fre");
    const kor1 = form.getFieldValue("kor");
    const tag = form.getFieldValue("tag_id");
    let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
    try {
      var update1 = new Date().toISOString().toLocaleString();

      //Получаем последний phrase_id
      const id = await supabase.from("request").select("request_id");
      let max = -10;
      for (let i = 0; i < id.data.length; i++) {
        if (id.data[i]["request_id"] > max) {
          max = id.data[i]["request_id"];
        }
      }
      const { error1 } = await supabase.from("request").insert([
        {
          rus_request: rus1,
          fre_request: fre1,
          kor_request: kor1,
          status_id:1,
          type_id:1,
          user_id:parseInt(userID),
          tag_id:tag
          
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
    if (validrus(rus1)) {
      if (validfre(fre1)) {
        if (validkor(kor1)) {
          try {
            const { error } = await supabase
              .from("request")
              .insert({
                rus_request: rus1,
                  fre_request: fre1,
                  kor_request: kor1,
                  status_id:1,
                  type_id:1,
                  user_id:parseInt(userID),
                  tag_id:tag,
                phrase_id:27
              });
          } catch (error) {
            alert(error.error_description || error.message);
          }
          notification.open({message:'Успешно',description:'Вы успешно добавили запрос!'})
        } else {      
          notification.open({message:'Ошибка',description:'Вы ввели некорректный корейский перевод!'})
         
        }
      } else {       
        notification.open({message:'Ошибка',description:'Вы ввели некорректный французский перевод перевод!'})
       
      }
    } else {
      notification.open({message:'Ошибка',description:'Вы ввели некорректный русский перевод!'})
      
    }
  }

  
  return (
    <div className="">
      <Header logo={logoHeaderAuthUser} buttons={buttons} />
{/* Модальное окно для добавления фразеологизма */}
      <Modal
        open={show}
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
                required: true,
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
{/* Модельное окно для обновления */}

<Modal
        open={show1}
        title="Обновление фразеологизма"
        onCancel={cancel}
        footer={[
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

      <div className="bodyApp">
        <Table
        loading={loading}
        dataSource={request}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record.request_id}
        onRow={(record) => ({
          onClick: () => {

          },
        })}
      />
      </div>
    </div>
  );
}
//Передаваемые кнопки в футер

export default Requests;