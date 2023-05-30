import React, { Component } from "react";

//Импорт компонентов
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { supabase } from "../supabase/supabaseClient";

import { Button, Form, Input, Checkbox, Affix, notification } from "antd";

export default function Authorization() {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  function LogIN() {
    const email = document.getElementById("logemailIn").value;
    const password = document.getElementById("logpassIn").value;

    if (email == "k1@m.ru") {
      signin(true, () => navigate("/pages/ModerAccount"));
    } else if (email == "k2@m.ru")
      signin(true, () => navigate("/pages/ExpertAccount"));
    else signin(true, () => navigate("/pages/UserAccount"));
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
                                LogIN();
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
                              placeholder="Как вас зовут ?"
                              id="logname"
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
                              <Button className="AuthbuttonWhite">
                              onClick={() => {
                                navigate(fromPage);
                              }}
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
