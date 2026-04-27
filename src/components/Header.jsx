// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogIn,
  LogOut,
  Settings,
  BarChart4,
  Home
} from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
  }, [location]);

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    });
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header
      className="landing-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "var(--bg-color)",
        borderBottom: "1px solid #444",
        position: "sticky",
        top: 0,
        zIndex: 999,
        padding: "0 1rem"
      }}
    >
      <div className="logo-area" style={{ flex: 1 }}>
        <img
          src="/vjimmes2003_logo.png"
          alt="Logo"
          style={{ height: "96px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>

      <div
        className="site-name-area"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <h1 className="site-name">vjimmes2003</h1>
      </div>

      <div
        className="icon-buttons"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "0.8rem"
        }}
      >
        {user ? (
          <>
            {/* Botón acceso al panel principal */}
            <button
              onClick={() => navigate("/panel")}
              title="Panel de servidores"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <BarChart4 size={24} color="#00ddff" />
            </button>

            {/* Solo para master: botón admin */}
            {user.role === "master" && (
              <button
                onClick={() => navigate("/admin")}
                title="Panel de administración"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <Settings size={24} color="#ffaa00" />
              </button>
            )}

            {/* Cerrar sesión */}
            <button
              onClick={logout}
              title="Cerrar sesión"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <LogOut size={24} color="#ff5c5c" />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            title="Iniciar sesión"
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            <LogIn size={24} color="#00ff88" />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
