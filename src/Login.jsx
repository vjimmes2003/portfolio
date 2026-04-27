import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warn("Debes rellenar todos los campos.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        toast.error(`Error: ${text || res.status}`);
        return;
      }

      const data = await res.json();
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data,
          role: data.role.toLowerCase().trim()
        })
      );
      
      toast.success("¡Login exitoso!");
      navigate("/panel"); // redirige al dashboard
    } catch (err) {
      console.error("Error en el login:", err);
      toast.error("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="logo-area" style={{justifyContent: "center"}}>
                <img src="/vjimmes2003_logo.png"
                    alt="Logo"
                    style={{ height: " 96px", cursor:"pointer" }}
                    onClick={() => navigate("/")}
                    
                />
      </div>
      <h1>Iniciar sesión</h1>
      
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "5px" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px" }}
      />
      <button onClick={handleLogin} className="login-button">
        Acceder
      </button>
    </div>
  );
}

export default Login;
