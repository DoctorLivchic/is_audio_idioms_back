import React, { Component } from "react";

//Импорт компонентов
import MainPage from "./pages/MainPage";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <body>
      <div>
        <MainPage />
      </div>
    </body>
  );
};
export default App;
