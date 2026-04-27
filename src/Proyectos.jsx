import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header"; // ruta relativa si cambia

function Proyectos() {
    const navigate = useNavigate();

    const proyectos = [
        {
            nombre: "🧠 LocalHub",
            descripcion: "Suite local con Chatbot, generador de imágenes y transcripción de audio (Whisper), todo offline con interfaz Gradio + FastAPI.",
            tecnologias: ["Python", "FastAPI", "Gradio", "Docker", "LLM local"],
            estado: "Disponible",
            link: "https://github.com/vjimmes2003/LocalHub"
        },
        {
            nombre: "📊 Panel Admin Minecraft",
            descripcion: "Interfaz personalizada con Flask, Docker, sesiones, backups automáticos y gestión remota de servidores en tiempo real.",
            tecnologias: ["Flask", "Docker", "React", "MariaDB", "Panel Login"],
            estado: "En desarrollo",
            link: "https://github.com/vjimmes2003"
        },
        {
            nombre: "🧩 DiscordBot Kokoro",
            descripcion: "Bot personalizado para moderación inteligente con IA, sistema de advertencias, integración con modelos NLP y roles automáticos.",
            tecnologias: ["Discord.js", "Python", "Flask", "NLP", "Zira", "Reacciones"],
            estado: "En pruebas",
            link: "https://github.com/vjimmes2003"
        },
        {
            nombre: "📦 Más proyectos próximamente...",
            descripcion: "Estoy preparando más herramientas para desplegar aquí: automatización, bots y asistentes personalizados.",
            tecnologias: [],
            estado: "Coming Soon",
            link: "#"
        }
    ];

    return (
        <div className="projects-page">
            <Header />
            <h1>📂 Mis proyectos personales y desarrollos</h1>
            <ul>
                {proyectos.map((proyecto, index) => (
                    <li key={index}>
                        <h2>{proyecto.nombre}</h2>
                        <p>{proyecto.descripcion}</p>
                        {proyecto.tecnologias.length > 0 && (
                            <ul>
                                {proyecto.tecnologias.map((tech, i) => (
                                    <li key={i}>⚙️ {tech}</li>
                                ))}
                            </ul>
                        )}
                        <p><strong><a href={proyecto.link} target="_blank" rel="noopener noreferrer">{proyecto.estado}</a></strong></p>
                        <hr />
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: "2rem" }}>
                <button onClick={() => navigate("/")} className="back-button">⬅ Volver al inicio</button>
            </div>
        </div>
    );
}

export default Proyectos;
