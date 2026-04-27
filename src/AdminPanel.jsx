// src/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

function AdminPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "viewer",
    allowed_servers: []
  });
  const [editingUser, setEditingUser] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      toast.error("Debes iniciar sesión para acceder.");
      setTimeout(() => navigate("/login"), 100);
      return;
    }
  
    const parsed = JSON.parse(stored);
    if (parsed.role !== "master") {
      toast.warn("No tienes permisos para entrar ahí.");
      setTimeout(() => navigate("/login"), 100);
      return;
    }
  
    setUser(parsed);
    loadUsers();
    loadDeletedUsers();
    loadTags();
  }, []);
  

  const loadUsers = async () => {
    const res = await fetch("/api/usuarios/list", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  const loadDeletedUsers = async () => {
    const res = await fetch("/api/usuarios/inactivos", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setDeletedUsers(data);
    }
  };

  const loadTags = async () => {
    const res = await fetch("/api/servers", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      const tagSet = new Set();
      data.forEach(s => (s.tags || []).forEach(t => tagSet.add(t)));
      setAvailableTags(Array.from(tagSet));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      allowed_servers: prev.allowed_servers.includes(tag)
        ? prev.allowed_servers.filter(t => t !== tag)
        : [...prev.allowed_servers, tag]
    }));
  };

  const handleSubmit = async () => {
    if (!form.username || (!form.password && !editingUser)) {
      toast.warn("Faltan datos obligatorios.");
      return;
    }

    const method = editingUser ? "PUT" : "POST";
    const endpoint = editingUser ? `/api/usuarios/${form.username}` : "/api/usuarios";

    const payload = {
      username: form.username,
      password: form.password,
      role: form.role,
      allowed_servers: form.allowed_servers
    };

    const res = await fetch(endpoint, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      toast.success(editingUser ? "Usuario actualizado" : "Usuario creado");
      setForm({ username: "", password: "", role: "viewer", allowed_servers: [] });
      setEditingUser(null);
      loadUsers();
      loadDeletedUsers();
    } else {
      const data = await res.json();
      toast.error(data.error || "Error");
    }
  };

  const handleDelete = async (username) => {
    const confirm = window.confirm("¿Seguro que quieres desactivar este usuario?");
    if (!confirm) return;
    const res = await fetch(`/api/usuarios/${username}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (res.ok) {
      toast.success("Usuario desactivado");
      loadUsers();
      loadDeletedUsers();
    }
  };

  const restoreUser = async (username) => {
    const res = await fetch(`/api/usuarios/restore/${username}`, {
      method: "PUT",
      credentials: "include"
    });
    if (res.ok) {
      toast.success("Usuario restaurado");
      loadUsers();
      loadDeletedUsers();
    }
  };

  const handleEdit = (u) => {
    setForm({
      username: u.username,
      password: "",
      role: u.role,
      allowed_servers: u.allowed_servers
    });
    setEditingUser(true);
  };

  const filtradoPorTexto = (u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="dashboard-page">
      <Header />
      <h1>👑 Gestión de Usuarios</h1>

      {/* Formulario superior */}
      <div>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          disabled={editingUser}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          {["viewer", "opener", "moderator", "admin", "master"].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {availableTags.map(tag => (
            <span
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding: "6px 10px",
                borderRadius: "999px",
                background: form.allowed_servers.includes(tag) ? "var(--accent)" : "#ccc",
                cursor: "pointer",
                color: "black",
                fontWeight: "bold"
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button onClick={handleSubmit} className="back-button" style={{ marginTop: "1rem" }}>
          {editingUser ? "Guardar cambios" : "Crear usuario"}
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar usuario o rol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "1rem", padding: "5px", width: "100%" }}
      />

      {/* Tabla de usuarios activos */}
      <h2 style={{ marginTop: "2rem" }}>🟢 Usuarios activos</h2>
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acceso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(filtradoPorTexto).map((u) => (
            <tr key={u.username}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.allowed_servers.join(", ")}</td>
              <td>
                <button onClick={() => handleEdit(u)}>✏️</button>
                <button onClick={() => handleDelete(u.username)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de usuarios eliminados */}
      <h2 style={{ marginTop: "2rem" }}>🔴 Usuarios desactivados</h2>
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acceso</th>
            <th>Restaurar</th>
          </tr>
        </thead>
        <tbody>
          {deletedUsers.filter(filtradoPorTexto).map((u) => (
            <tr key={u.username}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.allowed_servers.join(", ")}</td>
              <td>
                <button onClick={() => restoreUser(u.username)}>✅</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;

