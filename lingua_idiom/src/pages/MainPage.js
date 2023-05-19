import React, { Component } from "react";

//Импорт компонентов
import Footer from "../components/footer";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import { RequireAuth } from "./RequireAuth";
// import { AuthProvider } from "./AuthProvider";

class MainPage extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "grey" }}>
        <Footer />
      </div>
    );
  }
}
export default MainPage;
