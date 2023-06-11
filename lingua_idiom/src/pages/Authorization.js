import React, { Component } from "react";
import { useState } from "react";

//Импорт компонентов
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { supabase } from "../supabase/supabaseClient";

import { Button, Form, Input, Checkbox, Affix, notification } from "antd";

export default function Authorization() {
  const [user_id, setUser_id] = useState(0);
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  // function LogIN() {
  //   const email = document.getElementById("logemailIn").value;
  //   const password = document.getElementById("logpassIn").value;

  //   if (email == "k1@m.ru") {
  //     signin(true, () => navigate("/pages/ModerAccount"));
  //   } else if (email == "k2@m.ru")
  //     signin(true, () => navigate("/pages/ExpertAccount"));
  //   else signin(true, () => navigate("/pages/UserAccount"));
  // }

  async function logIn() {
    const email = document.getElementById("logemailIn").value;
    const password = document.getElementById("logpassIn").value;

    //Ищем пользователя в таблице - если нет - выдаем ошибку role
    try {
      const user = await supabase
        .from("user")
        .select()
        .eq("login", email)
        .eq("password", password);

        const ril = await supabase
        .from("role")
        .select()

      if (user.data.length == 0) {
        notification.open({
          message: "Ошибка",
          description: "Вы ввели некорректные данные!",
        });
      } else {
        if (user.data[0]["role_id"] == 1) {
          localStorage.setItem("userID", user.data[0]["user_id"]);
          localStorage.setItem("userName", user.data[0]["name"]);
          localStorage.setItem("userSurname", user.data[0]["surname"]);
          localStorage.setItem("userpatronymic", user.data[0]["patronymic"]);
          localStorage.setItem("useremail", user.data[0]["email"]);
          localStorage.setItem("userol", ril.data[0+1]["role_name"]);
          setUser_id(user.data[0]["user_id"]);
          console.log(String(user_id));
          signin(true, () => navigate("/pages/ModerAccount"));
          notification.open({
            message: "Успешно",
            description: "Вы успешно авторизовались!",
          });
        } else if (user.data[0]["role_id"] == 2) {
          localStorage.setItem("userID", user.data[0]["user_id"]);
          localStorage.setItem("userName", user.data[0]["name"]);
          localStorage.setItem("userSurname", user.data[0]["surname"]);
          localStorage.setItem("userpatronymic", user.data[0]["patronymic"]);
          localStorage.setItem("useremail", user.data[0]["email"]);
          localStorage.setItem("userol", ril.data[0]["role_name"]);
          setUser_id(user.data[0]["user_id"]);
          signin(true, () => navigate("/pages/ExpertAccount"));
          notification.open({
            message: "Успешно",
            description:  "Вы успешно авторизовались!",
          });
        } else {
          localStorage.setItem("userID", user.data[0]["user_id"]);
          localStorage.setItem("userName", user.data[0]["name"]);
          localStorage.setItem("userSurname", user.data[0]["surname"]);
          localStorage.setItem("userpatronymic", user.data[0]["patronymic"]);
          localStorage.setItem("useremail", user.data[0]["email"]);
          localStorage.setItem("userol", ril.data[0+2]["role_name"]);
          setUser_id(user.data[0]["user_id"]);
          signin(true, () => navigate("/pages/UserAccount"));
          notification.open({
            message: "Успешно",
            description: "Вы успешно авторизовались!",
          });
        }
      }
    } catch (error) {
      notification.open({ message: "Ошибка", description: error.message });
    }
  }

  //Валидация мэйла
  function ValidMail(email) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(email);
    return valid;
  }

  //Валидация имени
  function validName(name, surname, patronymic) {
    var re = /^[A-ZА-ЯЁ]+$/i;
    var valid = re.test(name, surname, patronymic);
    return valid;
  }

  //Сравнение паролей
  function comparePass(password, passAffirm) {
    if (password == passAffirm) {
      if (password != "") return true;
    } else {
      return false;
    }
  }

  //Получение таблицы user
  async function getUser() {
    const profiles = await supabase.from("user").select();
    return profiles;
  }

  //Регистрация нового пользователя
  async function addUser() {
    const email1 = document.getElementById("logemailUp").value;
    const password1 = document.getElementById("logpassUp").value;
    const name1 = document.getElementById("logname").value;
    const passAffirm = document.getElementById("logpassAffirm").value;
    const surname1 = document.getElementById("logsurname").value;
    const lastname = document.getElementById("loglastname").value;

    //console.log(styles.box-shadow)

    //Запись
    if (validName(name1, surname1, lastname)) {
      if (ValidMail(email1)) {
        if (comparePass(password1, passAffirm)) {
          try {
            const { error } = await supabase.from("user").insert({
              name: name1,
              surname:surname1,
              patronymic:lastname,
              email: email1,
              password: password1,
              role_id: 3,
              login: email1,
            });
          } catch (error) {
            notification.open({
              message: "Ошибка",
              description: error.message,
            });
          }
          notification.open({
            message: "Успешно",
            description: "Регистрация прошла успешно",
          });
          window.location.reload();
        } else {
          notification.open({
            message: "Ошибка",
            description: "Ваши пароли не совпадают!",
          });
          document.getElementById("logpassUp").value = "";
          document.getElementById("logpassAffirm").value = "";
        }
      } else {
        notification.open({
          message: "Ошибка",
          description: "Вы ввели некорректный email!",
        });
        document.getElementById("logemailUp").value = "";
      }
    } else {
      notification.open({
        message: "Ошибка",
        description: "Вы ввели некорректное имя, фамилию или отчество!",
      });
      document.getElementById("logname").value = "";
    }

    //попытка получить последнего добавленного юзера

    const user = getUser();
    const data = (await user).data;

    // const usr = data[data.length-1]; //получаем последнюю запись
  }

  return (
    <div className="mainDivAuth">
      <div className="authRegDiv">
        <div className="textAuth">АВТОРИЗАЦИЯ</div>
        <div className="textAuth">РЕГИСТРАЦИЯ</div>
      </div>

      <div className="authorization">
        <div className="section">
          <div className="container1">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>

                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="authText">Авторизоваться</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="inputAuth"
                              placeholder="Электронная почта"
                              id="logemailIn"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>

                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="inputAuth"
                              placeholder="Пароль"
                              id="logpassIn"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <Form.Item>
                            <Button
                              onClick={() => {
                                navigate(fromPage);
                              }}
                              className="AuthbuttonWhite"
                            >
                              Назад
                            </Button>
                            <Button
                              onClick={() => {
                                logIn();
                              }}
                              className="AuthbuttonWhite"
                            >
                              Войти
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="authText">Зарегистрироваться</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="inputAuth"
                              placeholder="Имя"
                              id="logname"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="inputAuth"
                              placeholder="Фамилия"
                              id="logsurname"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="inputAuth"
                              placeholder="Отчество"
                              id="loglastname"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="logemail"
                              className="inputAuth"
                              placeholder="Электронная почта"
                              id="logemailUp"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>

                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="inputAuth"
                              placeholder="Пароль"
                              id="logpassUp"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpassAffirm"
                              className="inputAuth"
                              placeholder="Подтвердите пароль"
                              id="logpassAffirm"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="button">
                            <Form.Item>
                              <Button
                                onClick={() => {
                                  navigate(fromPage);
                                }}
                                className="AuthbuttonWhite"
                              >
                                Назад
                              </Button>
                              <Button
                                className="AuthbuttonWhite"
                                onClick={addUser}
                              >
                                Зарегистрироваться
                              </Button>
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
