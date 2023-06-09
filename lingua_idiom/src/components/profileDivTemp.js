import React, { Component } from "react";
import { useAuth } from "../hoc/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import User from "../img/User.png";
import profileDiv from "../img/profileDiv.png";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { supabase } from "../supabase/supabaseClient";

export default function ProfileDivTemp() {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const user_name =localStorage.getItem("userName")
  const user_surname =localStorage.getItem("userSurname")
  const user_patronamic =localStorage.getItem("userpatronymic")
  const email =localStorage.getItem("useremail")
  const rol =localStorage.getItem("userol")
  const id =localStorage.getItem("userID")
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form] = useForm();
  function cancel() {
    setShow(false);
    setShowEdit(false);
  }
  async function update(){
    const password = document.getElementById("logpassIn").value;
    const passNew = document.getElementById("logpassNew").value;
    const passNew2 =document.getElementById("logpassNew2").value;
    if(password==""){
      notification.open({ message: "Ошибка", description: "Данные не введены" });
    }
    else {
       try {
      const user = await supabase
        .from("user")
        .select()
        .eq("password", password)
        .eq("user_id",id)
      const idtec=user.data[0]["user_id"]
      if (passNew==passNew2){
        if(id==idtec){
        console.log("Успешно")
        const { error1 } = await supabase
        .from("user")
        .update({ password: passNew2 })
        .eq("user_id",id)
      }else{
        notification.open({ message: "Ошибка", description: "Неверный пароль пользователя" });
      }
      }  else{
        notification.open({ message: "Ошибка", description: "Пароли не совпадают" });
      }
     
      }
     catch (error) {
      notification.open({ message: "Ошибка", description: "Неверный пароль пользователя" });
    }
    }
  }

  async function updateUsPar() {
    setShowEdit(true);}
  return (
    
    <div className="profileDiv">
    <Modal
        open={showEdit}
        title="Изменение пароля"
        onCancel={cancel}
        footer={[
          <Button onClick={update}>Обновить</Button>,
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
            name="logpassIn"
            label="Введите действующий пароль"
            rules={[
              {
                required: true,
                message: "Пароль не может быть пустым",
              },
            ]}
          >
            <Input name="logpassIn" id="logpassIn" placeholder="Введите действующий пароль" />
          </Form.Item>
          <Form.Item name="logpassNew" label="Новый пароль  ">
            <Input
              name="logpassNew"
              id="logpassNew"
              placeholder="Новый пароль"
              rules={[
                {
                  required: true,
                  message: "Новый пароль не может быть пустым",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="logpassNew2" label="Повторите пароль">
            <Input
              name="logpassNew2"
              id="logpassNew2"
              placeholder="Повторите пароль"
              rules={[
                {
                  required: true,
                  message: "Новый пароль не может быть пустым",
                },
              ]}
            />
          </Form.Item>
     
        </Form>
      </Modal>


      <div className="BobyUser">
        <div className="buttonUserEx1">
        
       <Button className="buttonUserEx"   onClick={() => {
        navigate("/pages/Favorites");
      }}> Избранное</Button>

      <Button className="buttonUserEx"  onClick={() => {
        signout(() => navigate("/", { replace: true }));
      }}> Выйти</Button>
      </div>
       
      <div className="UserIMG">
        
    
      <div className="doby_user_unfo">
      <div className="user_info">
      <h3 className="H3" ><b> Данные для входа в систему</b></h3>
      <div className="lin"></div>
      <h3 className="h3"> Имя пользователя</h3>
      <p className="ptext">{user_name}</p>
            
      <div className="linmin"></div>
      <h3 className="h3"> Фамилия пользователя</h3>
      <p className="ptext">{user_surname}</p>
      
      <div className="linmin"></div>
      <h3 className="h3"> Отчество пользователя</h3>
      <p className="ptext">{user_patronamic}</p>
      
      <div className="linmin"></div>
      <h3 className="h3"> Адрес электронной почты</h3>
      <p className="ptext">{email}</p>
     
      <div className="linmin"></div>
      </div>
      </div>
      
      <div className="user_info_more">
      <h3 className="H3"> <b>Дополнительная информация</b> </h3>
        <div className="lin"></div>
        <h3 className="h3">Роль </h3>
        <p className="ptext">{rol}</p>
        <div className="linmin"/>
        <h3 className="h3"> Пароль</h3>
        <p className="ptext">********</p>
         <div className="linmin"/>
       <p className="red" onClick={() => {
              updateUsPar();
            }}> Изменить пароль</p>
           
      </div>
      </div>
      <div className="button_favorite"> 
       
      </div>
      </div>
    </div>
  );
}


