import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ServerCard from "./components/ServerCard";
import "./App.css";
import Header from "./components/Header";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [servers, setServers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      toast.warn("Debes iniciar sesión");
      return navigate("/login");
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);
    fetchServers(parsed.allowed_servers);
  }, []);

  const fetchServers = async (allowed) => {
    try {
      const res = await fetch("/api/servers", {
        credentials: "include"
      });
      if (!res.ok) return toast.error("Error al obtener servidores");
      const all = await res.json();
      const visibles = all.filter(
        (s) =>
          allowed.includes("todo") ||
          (Array.isArray(s.tags) && s.tags.some(tag => allowed.includes(tag)))
      );

      setServers(visibles);
    } catch (err) {
      toast.error("Error al conectar con backend");
    }
  };

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="dashboard-page">
      <Header />
      <h1 style={{ textAlign: "center" }}>Bienvenido, {user.username}</h1>
      <p style={{ color: "#aaa", textAlign: "center" }}>
        Tu rol: <strong>{user.role}</strong>
      </p>

      <div className="server-grid">
        {servers.length === 0 && <p>No tienes servidores asignados.</p>}
        {servers.map((srv, idx) => (
          <ServerCard
            key={idx}
            server={srv}
            user={user}
            onRefresh={() => fetchServers(user.allowed_servers)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
