import React, { Component } from "react";

//Импорт компонентов
import MainPage from "./pages/MainPage";
import Authorization from "./pages/Authorization";
import AuthorizationBody from "./components/AuthorizationBody";
import RegistrationBody from "./components/RegistrationBody";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <body>
      <div>
        <Authorization />
      </div>
    </body>
  );
};
export default App;
