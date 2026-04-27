import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ContactoModal from "./components/ContactoModal";

function Discord() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");

  const servicios = [
    {
      nombre: "🎛️ Configuración Básica",
      precio: "5€",
      descripcion: [
        "Canales por categorías",
        "Permisos iniciales",
        "Roles manuales",
        "Reglas + bienvenida"
      ]
    },
    {
      nombre: "🎮 Pack Gamer",
      precio: "10€",
      descripcion: [
        "Canales de voz por juego",
        "Sistema de autoroles por reacción",
        "Bots de música, kick/votaciones",
        "Canales dinámicos"
      ]
    },
    {
      nombre: "🛡️ Seguridad + Automatización",
      precio: "15€",
      descripcion: [
        "Sistema de tickets avanzado",
        "Moderación automática con bot",
        "Logs de actividad",
        "Protección anti-raid y anti-spam"
      ]
    },
    {
      nombre: "🌈 Estética Premium",
      precio: "20€",
      descripcion: [
        "Imágenes de bienvenida",
        "Roles con emojis y colores",
        "Embeds animados",
        "Diseño visual cuidado"
      ]
    }
  ];

  return (
    <div className="discord-page">
      <Header />
      <h1>🤖 Servicios para tu servidor de Discord</h1>

      <div className="discord-grid">
        {servicios.map((servicio, index) => (
          <div key={index} className="dc-card">
            <h2>{servicio.nombre}</h2>
            <p className="precio">{servicio.precio}</p>
            <ul>
              {servicio.descripcion.map((linea, i) => (
                <li key={i}>{linea}</li>
              ))}
            </ul>
            <button onClick={() => {
              setServicioSeleccionado(servicio.nombre);
              setModalOpen(true);
            }}>
              📩 Contactar
            </button>
          </div>
        ))}
      </div>
      <img src="/discord_banner.png" alt="Discord header" className="discord-banner" />
      <div style={{ marginTop: "2rem" }}>
        <button onClick={() => navigate("/")} className="back-button">⬅ Volver al inicio</button>
      </div>

      {modalOpen && (
        <ContactoModal
          servicio={servicioSeleccionado}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Discord;
