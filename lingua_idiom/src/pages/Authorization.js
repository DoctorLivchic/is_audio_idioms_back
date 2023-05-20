import React, { Component } from "react";

//Импорт компонентов
import AuthorizationBody from "../components/AuthorizationBody";
import RegistrationBody from "../components/RegistrationBody";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

class Authorization extends React.Component {
  render() {
    return (
      <div>
        <AuthorizationBody />
        <div>
          <RegistrationBody />
        </div>
      </div>
    );
  }
}
export default Authorization;
