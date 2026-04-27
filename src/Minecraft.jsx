import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ContactoModal from "./components/ContactoModal";

function Minecraft() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [servicioSeleccionado, setServicioSeleccionado] = useState("");

    const planes = [
        {
            nombre: "🟢 Vanilla",
            precio: "5€ / mes",
            specs: ["4 GB de RAM", "Sin mods", "Ideal para amigos"]
        },
        {
            nombre: "🟡 Modded",
            precio: "15€ / mes",
            specs: ["8 GB de RAM", "< 100 mods", "Perfecto para packs ligeros"]
        },
        {
            nombre: "🔴 Personalizado",
            precio: "30€ / mes",
            specs: ["Hasta 16 GB de RAM", "~300 mods", "Optimización + Panel admin"]
        }
    ];

    return (
        <div className="minecraft-page">
            <Header />
            <h1>📦 Planes de Hosting para Minecraft</h1>
            <div className="minecraft-grid">
                {planes.map((plan, index) => (
                    <div key={index} className="mc-card">
                        <h2>{plan.nombre}</h2>
                        <p className="precio">{plan.precio}</p>
                        <ul>
                            {plan.specs.map((item, i) => (
                                <li key={i}>✅ {item}</li>
                            ))}
                        </ul>
                        <button onClick={() => {
                            setServicioSeleccionado(plan.nombre);
                            setModalOpen(true);
                        }}>
                            🛒 Lo quiero
                        </button>
                    </div>
                ))}
            </div>
            <img src="/minecraft_banner.png" alt="Minecraft header" className="decor-img" />
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

export default Minecraft;
