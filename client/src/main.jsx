
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./app/page";
import LoginPage from "./app/login/page";
import SignupPage from "./app/signup/page";
import DashboardPage from "./app/dashboard/page";
import MapPage from "./app/map/page";
import SettingsPage from "./app/settings/page";
import SupportPage from "./app/support/page";
import "./app/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const el = document.getElementById("root");
if (!el) throw new Error("Root element not found");

createRoot(el).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

