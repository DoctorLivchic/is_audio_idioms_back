import React, { Component } from "react";

//Импорт компонентов
import AuthorizationBody from "../components/AuthorizationBody";

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
      </div>
    );
  }
}
export default Authorization;
