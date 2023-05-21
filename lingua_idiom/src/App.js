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

import LoginPage from "./pages/loginpage";
import RequireAuth from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";

import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <>
      <AuthProvider>
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
          <Route
            path="/pages/UserAccount"
            element={
              <RequireAuth>
                <UserAccount />
              </RequireAuth>
            }
          />
          <Route path="/pages/Library" element={<Library />} />
          <Route path="/pages/loginpage" element={<LoginPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
};
export default App;
