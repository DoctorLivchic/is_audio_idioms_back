import React, { Component } from "react";

//Импорт компонентов
import MainPage from "./pages/MainPage";
import AuthorizationBody from "./components/AuthorizationBody";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <body>
      <div>
        <AuthorizationBody />
      </div>
    </body>
  );
};
export default App;
