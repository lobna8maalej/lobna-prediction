import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import DashboardPage from "./components/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard/*" element={<DashboardPage />} />

      </Routes>
    </BrowserRouter>
  );
}