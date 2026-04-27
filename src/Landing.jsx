import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-wrapper">
            <Header />
            <section className="intro-section">
                <p>
                    Hola, soy Víctor y este es mi sitio personal donde muestro lo que sé hacer,
                    ofrezco servicios de servidores y configuro Discord como un pro.
                </p>
            </section>
            <section className="column-section">
                {/* Bloque Minecraft */}
                <div className="info-box" onClick={() => navigate("/minecraft")}>
                    <img
                        src="/minecraft_banner.png"
                        alt="Banner Minecraft"
                        className="info-banner"
                    />
                    <div className="info-content">
                        <h2>🌍 Servidores Minecraft</h2>
                        <p>Hosting personalizado con backups, Docker y panel incluido.</p>
                        <button
                            className="info-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/minecraft#precios");
                            }}
                        >
                            🛒 Ver precios
                        </button>
                    </div>
                </div>
                {/* Bloque Discord */}
                <div className="info-box" onClick={() => navigate("/discord")}>
                    <img
                        src="/discord_banner.png"
                        alt="Banner Discord"
                        className="info-banner"
                    />
                    <div className="info-content">
                        <h2>🤖 Discord Bots</h2>
                        <p>Autoroles, comandos, logs, seguridad y administración eficaz.</p>
                        <button
                            className="info-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/discord#bots");
                            }}
                        >
                            ⚙️ Ver más
                        </button>
                    </div>
                </div>
                {/* Bloque Proyectos */}
                <div className="info-box" onClick={() => navigate("/proyectos")}>
                    <img
                        src="/proyecto_banner.png"
                        alt="Banner Proyectos"
                        className="info-banner"
                    />
                    <div className="info-content">
                        <h2>📂 Proyectos</h2>
                        <p>Bots, paneles, integraciones y código útil que he desarrollado.</p>
                        <button
                            className="info-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/proyectos#lista");
                            }}
                        >
                            🧩 Ver proyectos
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Landing;
