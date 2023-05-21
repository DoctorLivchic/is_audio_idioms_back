import React, { Component } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

//Импорт компонентов
import MainPage from "./pages/MainPage";
import Authorization from "./pages/Authorization";
import RegistrationForInternalUsers from "./pages/RegistrationForInternalUsers";
import Translater from "./pages/Translater";
import About from "./pages/About";
import ModerAccount from "./pages/ModerAccount";
import ExpertAccount from "./pages/ExpertAccount";
import UserAccount from "./pages/UserAccount";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";

import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pages/Authorization" element={<Authorization />} />
        <Route
          path="/pages/RegistrationForInternalUsers"
          element={<RegistrationForInternalUsers />}
        />
        <Route path="/pages/Translater" element={<Translater />} />
        <Route path="/pages/About" element={<About />} />
        <Route path="/pages/ModerAccount" element={<ModerAccount />} />
        <Route path="/pages/ExpertAccount" element={<ExpertAccount />} />
        <Route path="/pages/UserAccount" element={<UserAccount />} />
        <Route path="/pages/Library" element={<Library />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
