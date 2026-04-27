// src/App.jsx
import React, { useEffect, useState } from 'react';
import { getServers } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Dashboard from './Dashboard';
import ThemeToggle from './components/ThemeToggle';


function App() {
  const [servers, setServers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Carga de la lista de servidores
  const loadServers = async () => {
    try {
      const data = await getServers();
      setServers(data || []);
    } catch {
      // getServers ya lanza toast de error
    }
  };

  // Comprueba sesión llamando a /api/me
  const checkSession = async () => {
    try {
      const res = await fetch('/api/me', {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        const me = await res.json();
        setUser(me);
        setLoggedIn(true);
        loadServers();
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    } catch {
      toast.error('No se pudo verificar la sesión');
      setLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // **Recibe el objeto usuario desde <Login>**
  const handleLoginSuccess = (me) => {
    toast.success('Login exitoso');
    setUser(me);
    setLoggedIn(true);
    loadServers();
  };

  // Logout: llama a /api/logout y limpia estado
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) toast.info('Sesión cerrada');
    } catch {
      toast.error('Error al cerrar sesión');
    } finally {
      setLoggedIn(false);
      setUser(null);
      setServers([]);
    }
  };

  return (
    <>
      <ThemeToggle /> {/* ✅ botón flotante en esquina */}
      {/*  ➡️ Contenedor global de toasts */}
      <ToastContainer position="top-right" />

      {loggedIn
        ? (
          <Dashboard
            servers={servers}
            user={user}
            onRefresh={loadServers}
            onLogout={handleLogout}
          />
        )
        : <Login onLogin={handleLoginSuccess} />
      }
    </>
  );
}

export default App;
