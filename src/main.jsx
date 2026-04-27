// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Componentes
import App from "./App.jsx";               // fallback o página no encontrada
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Landing from "./Landing.jsx";
import Minecraft from "./Minecraft.jsx";
import Discord from "./Discord.jsx";
import Proyectos from "./Proyectos.jsx";
import Contacto from "./Contacto.jsx";
import ThemeToggle from "./components/ThemeToggle"; // ⬅️ AÑADIDO
import AdminPanel from "./AdminPanel.jsx"; // al principio



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeToggle /> {/* ⬅️ BOTÓN GLOBAL DE TEMA */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Dashboard />} />
        <Route path="/minecraft" element={<Minecraft />} />
        <Route path="/discord" element={<Discord />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<App />} /> {/* fallback */}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  </React.StrictMode>
);
