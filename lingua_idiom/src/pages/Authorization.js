import React, { Component } from "react";

//Импорт компонентов
import AuthorizationBody from "../components/AuthorizationBody";
import RegistrationBody from "../components/RegistrationBody";
import Switch from "../components/Switch";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

class Authorization extends React.Component {
  render() {
    return (
      <div className="mainDivAuth">
        <div className="authRegDiv">
          <div className="textAuth">АВТОРИЗАЦИЯ</div>
          <div className="textAuth">РЕГИСТРАЦИЯ</div>
        </div>
        <div className="switchDiv">
          <div className="switchDivChild">
            <Switch />
          </div>
        </div>

        <AuthorizationBody />
        <div>
          <RegistrationBody />
        </div>
      </div>
    );
  }
}
export default Authorization;
