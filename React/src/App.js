import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Controller from "./components/controller";



function App() {
  return (
    <>
    <Main />
      <Routes>
        <Route path="/controller" element={<Controller />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
